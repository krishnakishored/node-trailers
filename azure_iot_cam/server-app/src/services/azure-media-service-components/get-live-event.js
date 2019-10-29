import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import {AzureMediaServices, AzureMediaServicesModels, AzureMediaServicesMappers} from "@azure/arm-mediaservices";

const getLiveEvent = (credentials, subscriptionId, resourceGroupName, accountName, liveEventName) => {

    const mediaServices = new AzureMediaServices(credentials, subscriptionId);

    return mediaServices.liveEvents.get(resourceGroupName, accountName, liveEventName);

}

module.exports = {
    getLiveEvent : getLiveEvent
}