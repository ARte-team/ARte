"use strict";

class PahoMQTTClient {

  constructor(requestUrl, clientId) {
    this.requestUrl  = requestUrl;
    this.clientId    = clientId;
    this.client      = null;
    this.isConnected = false;
  }

  // Connect to the server
  conn(callbackConnection=null, callbackReceive=null) {
    this.client = new Paho.MQTT.Client(this.requestUrl, this.clientId);

    var connectOptions = {
      onSuccess: () => {
        // Connect succeeded
        console.log("onConnect: connect succeeded");
        // With an arrow function "this" represents the owner of the function
        // while with a regular function "this" represents the object that calls the function
        this.isConnected = true;
        if(callbackConnection != null)
          callbackConnection();
      },
      useSSL: true,
      timeout: 3,
      mqttVersion: 4,
      onFailure: function() {
        // Connect failed
        console.log("onFailure: connect failed");
        if(callbackConnection != null)
          callbackConnection();
      }
    };

    // Set callback handlers
    this.client.onConnectionLost = onConnectionLost;
    this.client.onMessageArrived = onMessageArrived;

    // Connect the client
    this.client.connect(connectOptions);


    // Called when the client loses its connection
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0)
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }

    // Called when a message arrives
    function onMessageArrived(message) {
      console.log("onMessageArrived:" + message.payloadString);
      if(callbackReceive != null)
        callbackReceive(message.payloadString);
    }

  }

  // Subscribe to a topic
  sub(topic) {
    console.log("Subscribing on topic " + topic);
    this.client.subscribe(topic);
  }

  // Publish a message on a topic
  pub(message, topic) {
    console.log("Publishing message on topic " + topic);
    // QOS = 0 => Best effort, retained = false => Message delivered only to current subscriptions
    this.client.send(topic, message, 0, false);
  }

  // Unsubscribe to a topic
  unsub(topic) {
    console.log("Unsubscribing on topic " + topic);
    this.client.unsubscribe(topic);
  }

  // Disconnect the client
  disc() {
    console.log("Disconnecting the client");
    this.client.disconnect();
    this.isConnected = false;
  }

  isConn() {
    return this.isConnected;
  }

}
