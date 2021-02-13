"use strict";

class ARte {

    constructor(uuid) {
        this.artworkRecognized  = false;
        this.artworkID          = null;
        this.activeFeature      = '';
        this.featureAttributes  = { status: 0 };
        this.startTime          = 0;
        this.stopTime           = 0;
		    this.newView			      = true;

        this.uuid               = uuid;

        this.message = {};
    }

    getArtworkRecognized() {
      return this.artworkRecognized;
    }

    getArtworkID() {
      return this.artworkID;
    }

    getActiveFeature() {
      return this.activeFeature;
    }

    // Get Web App feature status
    getStatus() {
      return this.featureAttributes.status;
    }

    setArtworkRecognized(status) {
      this.artworkRecognized = status;
    }

    setArtworkID(id) {
      this.artworkID = id;
    }

    setNewView(status) {
      this.newView = status;
    }

    // When a feature button is pressed, take the start time
    startFeature(feature) {
        this.activeFeature = feature;
        this.startTime = Date.now();
        this.stopTime  = 0;

        this.featureAttributes.status = 1;
    }

    // When phone is idle or feature is deactivated, take the stop time
    stopFeature() {
        this.stopTime = Date.now();

        this.featureAttributes.status = 0;
    }

    // Function triggered at the end of a feature
    getMessage() {
        if(this.startTime > 0 && this.stopTime > 0) {
            this.message['usageTime'] = Math.round((this.stopTime - this.startTime) / 1000);
            //this.message['datetime']  = this.stopTime;
            this.message['deviceID']  = this.uuid;
            this.message['artworkID'] = this.artworkID;
            this.message['feature']   = this.activeFeature;
			      this.message['newView']   = this.newView;

            return this.message;
        }

        return null;
    }

}
