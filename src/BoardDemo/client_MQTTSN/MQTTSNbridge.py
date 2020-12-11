from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import MQTTSNclient
import json

# JSON file to be published
jsonP = ''

# clients for MQTT and MQTTS
MQTTClient = AWSIoTMQTTClient("MQTTSNbridge")
MQTTSNClient = MQTTSNclient.Client("bridge", port=1885)

class Callback:
  # function that replies a message from the MQTTSN broker to the MQTT one
  # and inserts into the database the message just arrived
  def messageArrived(self, topicName, payload, qos, retained, msgid):
      message = payload.decode("utf-8")
      jsonP = json.loads(message) 
      print(topicName, message)
      MQTTClient.publish(topicName, message, qos)
      return True

# path that indicates the certificates position
path = "../certs/"

# configure the access with the AWS MQTT broker
MQTTClient.configureEndpoint("a3um1mnv6jt2hg-ats.iot.us-east-1.amazonaws.com", 8883)
MQTTClient.configureCredentials(path+"root-CA.crt",
                                path+"private.pem.key",
                                path+"certificate.pem.crt")

# configure the MQTT broker
MQTTClient.configureOfflinePublishQueueing(-1)  # Infinite offline Publish queueing
MQTTClient.configureDrainingFrequency(2)  # Draining: 2 Hz
MQTTClient.configureConnectDisconnectTimeout(10)  # 10 sec
MQTTClient.configureMQTTOperationTimeout(5)  # 5 sec

# register the callback
MQTTSNClient.registerCallback(Callback())

# make connections to the clients
MQTTClient.connect()
MQTTSNClient.connect()

# subscribe to the topics
MQTTSNClient.subscribe("sensor/room")

# cycle that wait for a command to close the program
while True:
    if input("Enter 'quit' to exit from the program.\n") == "quit":
        break

# disconnect from the clients
MQTTSNClient.disconnect()
MQTTClient.disconnect()
