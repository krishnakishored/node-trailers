import {AzureMediaServices, AzureMediaServicesModels, AzureMediaServicesMappers} from "@azure/arm-mediaservices";

const stopLiveEvent = (credentials, subscriptionId, resourceGroupName, accountName, liveEventName ) => {
    const mediaServices = new AzureMediaServices(credentials, subscriptionId);
                
    const liveEventAction = {
        "removeOutputsOnStop": false
    }

    return mediaServices.liveEvents.stop(resourceGroupName, accountName, liveEventName, liveEventAction)
}

module.exports = {
    stopLiveEvent : stopLiveEvent
}