"use strict";

class ARte {

    constructor(uuid) {        
        this.artworkRecognized  = 0;
        this.artworkID          = 1;
        this.activeFeature      = '';
        this.featureAttributes  = { status: 0 };
        this.startTime          = 0;

        this.uuid               = uuid;

        this.message = {
            deviceID: '',
            datetime: '',
            feature: '',
            usageTime: '',
            artworkID: ''
        }
    }
        
    // When a feature button is pressed, message is filled in the correct way
    startFeature(feature) {
        this.activeFeature = feature;
        this.startTime = Date.now();
    }


    // When phone is idle or feature is deactivated, stop the execution
    stopFeature() {
        this.activeFeature = '';
        //this.featureAttributes = {};
        this.startTime = 0;
    }


    // Function triggered at the end of a feature
    getMessage() {
        if(this.startTime > 0) {
            var stopTime = Date.now();
            this.message['usageTime'] = (stopTime - this.startTime) / 1000;
            this.message['datetime'] = stopTime;
            this.message['deviceID'] = this.uuid;
            this.message['artworkID'] = this.artworkID;
            this.message['feature'] = this.activeFeature;
            
            return JSON.stringify(this.message);
        }
    }
}