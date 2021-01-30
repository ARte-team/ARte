from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import MQTTSNclient
import json

# clients for MQTT and MQTTS
MQTTClient   = AWSIoTMQTTClient("MQTTSNbridge")
MQTTSNClient = MQTTSNclient.Client("bridge", port=1885)

topicsDict = {}

class Callback:
    # Send a unique message for all messages sent by the boards in a room
    def send(self, topicName, roomDict, qos):
        if (roomDict and roomDict["counterBoard"] \
            and len(roomDict["infraredBoards"]) == roomDict["counterBoard"]["infraredSensors"]):
            # Create message to send to the backend
            del roomDict["counterBoard"]["infraredSensors"]
            msg = roomDict["counterBoard"]
            msg["infraredValues"] = []

            for board in roomDict["infraredBoards"]:
                if roomDict["counterBoard"]["peopleCurrent"] == 0:
                    msg["infraredValues"].append(0.0)
                else:    
                    msg["infraredValues"].append(board["value"])

            print("\nmessage to publish: ", msg)
            MQTTClient.publish(topicName, json.dumps(msg), qos)
            print("\nmessage published!\n===============================")

            # Clean room dict
            roomDict["counterBoard"]   = None
            roomDict["infraredBoards"] = []

    # Function that replies a message from the MQTTSN broker to the MQTT one
    def messageArrived(self, topicName, payload, qos, retained, msgid):
        message = payload.decode("utf-8")
        print("===============================")
        print("topic: ", topicName)
        print("message: ", message)

        # Convert message in a dict
        msgObj = json.loads(message)

        # Check if museum entrance board
        if "roomID" in msgObj and msgObj["roomID"] == 0:
            MQTTClient.publish(topicName, message, qos)
            print("\nmessage published!\n===============================")
            return True


        # Check if counter board
        counterBoard = False
        if "crowding" in msgObj:
            counterBoard = True

        roomID = msgObj["roomID"]

        # Check if topic is already in the topics dictionary
        if topicName in topicsDict:
            #print("topicName found")
            roomsDict = topicsDict[topicName]

            # Check if room is already in the rooms dictionary
            if roomID in roomsDict:
                #print("roomID found")
                roomDict = roomsDict[roomID]

                # Update room dict entry
                if counterBoard:
                    roomDict["counterBoard"] = msgObj
                    # Try to send (if not all messages are arrived the send is dropped)
                    self.send(topicName, roomDict, qos)
                else:
                    roomDict["infraredBoards"].append(msgObj)
                    # Try to send (if not all messages are arrived the send is dropped)
                    self.send(topicName, roomDict, qos)

            # Else init an entry of the rooms dictionary
            else:
                if counterBoard:
                    roomsDict[roomID] = {"counterBoard": msgObj, "infraredBoards": []}
                else:
                    roomsDict[roomID] = {"counterBoard": None, "infraredBoards": [msgObj]}

        # Otherwise init an entry of the topics dictionary
        else:
            if counterBoard:
                topicsDict[topicName] = { roomID: {"counterBoard": msgObj, "infraredBoards": []} }
            else:
                topicsDict[topicName] = { roomID: {"counterBoard": None, "infraredBoards": [msgObj]} }

        return True


# Read CSV file (skipping the first line) and return a list
def readFromCSVFile(filename):
    list = []
    with open(filename) as file:
        file.readline()  # Skip the first line
        i = 1            # line0, line1, ...

        for line in file:
            data = line.strip().split(",")

            try:
                list.append(data[1])
            except:
                print("WARNING: line " + i + " is malformed: " + line)

            i += 1
    return list

if __name__ == "__main__":
    # Path to the certificates
    path = "../certs/"
    values = readFromCSVFile(path + "keys.txt")

    # configure the access with the AWS MQTT broker
    try:
        MQTTClient.configureEndpoint(values[0], 8883)
        MQTTClient.configureCredentials(path + values[3],
                                        path + values[2],
                                        path + values[1])
    except:
        print("Configuration Error: check your CSV file")
        exit()

    # configure the MQTT broker
    MQTTClient.configureOfflinePublishQueueing(-1)    # Infinite offline Publish queueing
    MQTTClient.configureDrainingFrequency(2)          # Draining: 2 Hz
    MQTTClient.configureConnectDisconnectTimeout(10)  # 10 sec
    MQTTClient.configureMQTTOperationTimeout(5)       # 5 sec

    # register the callback
    MQTTSNClient.registerCallback(Callback())

    # make connections to the clients
    MQTTClient.connect()
    MQTTSNClient.connect()

    # subscribe to the topic
    MQTTSNClient.subscribe("sensor/room")

    # cycle that wait for a command to close the program
    while True:
        if input("Enter 'quit' to exit from the program.\n") == "quit":
            break

    # disconnect from the clients
    MQTTSNClient.disconnect()
    MQTTClient.disconnect()
