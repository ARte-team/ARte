#include <stdio.h>
#include <string.h>
#include <stdlib.h>
// libraries added
#include <time.h>

#include "shell.h"
#include "msg.h"
#include "net/emcute.h"
#include "net/ipv6/addr.h"

#ifndef EMCUTE_ID
#define EMCUTE_ID ("gertrud")
#endif
#define EMCUTE_PORT (1883U)
#define EMCUTE_PRIO (THREAD_PRIORITY_MAIN - 1)

#define STRLEN_MAX 10

#define ACCESSIBLE     "GREEN"
#define ACCESS_AT_RISK "YELLOW"
#define NON_ACCESSIBLE "RED"

#define ANSI_COLOR_RED     "\x1b[31m"
#define ANSI_COLOR_GREEN   "\x1b[32m"
#define ANSI_COLOR_YELLOW  "\x1b[33m"
#define ANSI_BOLD_RED      "\x1b[1m\x1b[31m"
#define ANSI_BOLD_GREEN    "\x1b[1m\x1b[32m"
#define ANSI_BOLD_YELLOW   "\x1b[1m\x1b[33m"
#define ANSI_COLOR_RESET   "\x1b[0m"


static char stack[THREAD_STACKSIZE_DEFAULT];
static msg_t queue[8];

// struct that contains sensors
typedef struct rooms{
  int peopleCurrent;
  int peopleTotal;
}t_rooms;

static void *emcute_thread(void *arg)
{
    (void)arg;
    emcute_run(EMCUTE_PORT, EMCUTE_ID);
    return NULL; /* should never be reached */
}

// function that disconnects from the mqttsn gateway
static int discon(void){
    int res = emcute_discon();
    if (res == EMCUTE_NOGW) {
        puts("error: not connected to any broker");
        return 1;
    }
    else if (res != EMCUTE_OK) {
        puts("error: unable to disconnect");
        return 1;
    }
    //puts("Disconnect successful");

    return 0;
}

// function that publish messages to the topic
// it takes as input the topic, the message to send and
// the value of qos
static int pub(char* topic, char* data, int qos){
  emcute_topic_t t;
  unsigned flags = EMCUTE_QOS_0;

  switch (qos) {
      case 1:
        flags |= EMCUTE_QOS_1;
        break;
      case 2:
        flags |= EMCUTE_QOS_2;
        break;
      default:
        flags |= EMCUTE_QOS_0;
        break;
  }



  /* step 1: get topic id */
  t.name = topic;
  if (emcute_reg(&t) != EMCUTE_OK) {
      puts("error: unable to obtain topic ID");
      return 1;
  }

  /* step 2: publish data */
  if (emcute_pub(&t, data, strlen(data), flags) != EMCUTE_OK) {
      printf("error: unable to publish data to topic '%s [%i]'\n",
              t.name, (int)t.id);
      return 1;
  }

  printf("published %s on topic %s\n", data, topic);

  return 0;
}

// function that connects to the mqtt gateway
// it takes as input the ip address and the port
static int con(char* addr, int port){
  sock_udp_ep_t gw = { .family = AF_INET6, .port = EMCUTE_PORT };
  gw.port = port;

  /* parse address */
  if (ipv6_addr_from_str((ipv6_addr_t *)&gw.addr.ipv6, addr) == NULL) {
      printf("error parsing IPv6 address\n");
      return 1;
  }

  if (emcute_con(&gw, true, NULL, NULL, 0, 0) != EMCUTE_OK) {
      printf("error: unable to connect to [%s]:%i\n", addr, port);
      return 1;
  }
  //printf("Successfully connected to gateway at [%s]:%i\n", addr, port);

  return 0;
}

// function that initializes the struct values
static void init_num_people(t_rooms* r){
  r->peopleCurrent = 0;
  r->peopleTotal   = 0;
}

// function that controls the people flow with
// a probability that depends on the visiting hour
int people_flow(void){

  time_t my_time;
  struct tm* timeinfo;
  time(&my_time);
  timeinfo = localtime(&my_time);

  // opening hours of the museum 9am - 7pm
  if(timeinfo->tm_hour < 9 || timeinfo->tm_hour > 18)
    return 0;

  srand(time(NULL));

  int p = rand() % 100;

  // people flow based on the visiting hour
  if(timeinfo->tm_hour == 9 || timeinfo->tm_hour == 18) {
    if(p <= 20)
      return 1;
    else
      return 0;
  }

  if((timeinfo->tm_hour < 12) ||
     (timeinfo->tm_hour > 15 && timeinfo->tm_hour < 18)) {
    if(p <= 70)
      return 1;
    else
      return 0;
  }

  else {
    if(p <= 45)
      return 1;
    else
      return 0;
  }
}

// function that changes the number of people in a room
// based on probability
static void gen_num_people(t_rooms* r, int capacity){
  if(people_flow() && r->peopleCurrent < capacity){
    r->peopleCurrent += 1;
    r->peopleTotal   += 1;
  }
  else{
    if(r->peopleCurrent > 0){
      r->peopleCurrent -= 1;
    }
    else{
      return;
    }
  }
}

// function to set LED light (physically connected to the board)
// based on room crowding
static void setLedLight(float crowding) {
  char color[STRLEN_MAX]      = NON_ACCESSIBLE;
  //char ansi_color[STRLEN_MAX] = ANSI_COLOR_RED;
  char ansi_color[STRLEN_MAX] = ANSI_BOLD_RED;

  if (crowding <= 0.5) {
    strncpy(color, ACCESSIBLE, STRLEN_MAX);
    //strncpy(ansi_color, ANSI_COLOR_GREEN, STRLEN_MAX);
    strncpy(ansi_color, ANSI_BOLD_GREEN, STRLEN_MAX);
  }
  else if (crowding <= 0.75) {
    strncpy(color, ACCESS_AT_RISK, STRLEN_MAX);
    //strncpy(ansi_color, ANSI_COLOR_YELLOW, STRLEN_MAX);
    strncpy(ansi_color, ANSI_BOLD_YELLOW, STRLEN_MAX);
  }

  printf("LED light set to %s %s %s\n", ansi_color, color, ANSI_COLOR_RESET);
}

// new shell command: start the process
static int cmd_start(int argc, char **argv){
  if (argc < 6) {
      printf("Usage: %s <address> <port> <roomID> <roomCapacity> <infraredSensors>\n", argv[0]);
      return 1;
  }

  // room struct
  t_rooms* r = (t_rooms*)malloc(sizeof(t_rooms));

  // id of the room
  int roomID = atoi(argv[3]);

  // capacity of the room
  int capacity = atoi(argv[4]);

  // infrared sensors of the room
  int infraredSensors = atoi(argv[5]);

  // name of the topic
  char topic[32];
  sprintf(topic, "sensor/room");

  // json that it will published
  char json[128];

  // initialize the room
  init_num_people(r);

  while(1){
    // it tries to connect to the gateway
    if (con(argv[1], atoi(argv[2])))
      continue;

    // takes the current date and time
    char datetime[20];
    time_t current;
    time(&current);
    struct tm* t = localtime(&current);
    int c = strftime(datetime, sizeof(datetime), "%d/%m/%Y %T", t);
    if(c == 0) {
      printf("Error! Invalid format\n");
      return 0;
    }

    // update the values for the room
    gen_num_people(r, capacity);

    float crowding = (float)r->peopleCurrent / capacity;

    // fills a json document for each room
    sprintf(json, "{\"roomID\": %d, \"datetime\": \"%s\", \"infraredSensors\": %d, "
                  "\"peopleCurrent\": %d, \"peopleTotal\": %d, \"crowding\": %.2f}",
                  roomID, datetime, infraredSensors,
                  r->peopleCurrent, r->peopleTotal, crowding);

    // publish to the topic
    pub(topic, json, 0);

    // set the light of the physically connected LED
    setLedLight(crowding);

    // it disconnects from the gateway
    discon();

    // it sleeps for five seconds
    xtimer_sleep(5);
  }

  return 0;
}

static const shell_command_t shell_commands[] = {
    {"start", "Start the process", cmd_start},
    {NULL, NULL, NULL}};

int main(void)
{
    puts("Simulation of the people flow in a room, for the ARte project.\n");

    /* the main thread needs a msg queue to be able to run `ping6`*/
    msg_init_queue(queue, ARRAY_SIZE(queue));

    /* start the emcute thread */
    thread_create(stack, sizeof(stack), EMCUTE_PRIO, 0,
                  emcute_thread, NULL, "emcute");

    /* start shell */
    char line_buf[SHELL_DEFAULT_BUFSIZE];
    shell_run(shell_commands, line_buf, SHELL_DEFAULT_BUFSIZE);

    /* should be never reached */
    return 0;
}
