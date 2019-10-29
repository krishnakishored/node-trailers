import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import {AzureMediaServices, AzureMediaServicesModels, AzureMediaServicesMappers} from "@azure/arm-mediaservices";

const createLiveEvent = (credentials, subscriptionId, resourceGroupName, accountName, liveEventName) => {

    //======= request params =========
    const liveEventParams = {
        location: "South India",
        
        tags: {
          createdBy: "Tarini Kanta"
        },

        description: "Simple Live Event encoder for RTMP with 2-second keyframe interval and no ip restriction",

        input: {
          streamingProtocol: "RTMP",
          keyFrameIntervalDuration: "PT5S",
          accessControl: {
            ip: {
              allow: [
                {
                  name: "AllowAll",
                  address: "0.0.0.0",
                  subnetPrefixLength: 0
                }
              ]
            }
          }
        },

        preview: {
          accessControl: {
            ip: {
              allow: [
                {
                  name: "AllowAll",
                  address: "0.0.0.0"
                }
              ]
            }
          }
        },

        encoding: {
          encodingType: "Basic",
          presetName: ""
        },

        streamOptions: []
      };

      const mediaServices = new AzureMediaServices(credentials, subscriptionId);

      return mediaServices.liveEvents.create( resourceGroupName, accountName, liveEventName, liveEventParams );

}

module.exports = {
    createLiveEvent : createLiveEvent
}