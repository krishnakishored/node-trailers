import {AzureMediaServices, AzureMediaServicesModels, AzureMediaServicesMappers} from "@azure/arm-mediaservices";

const getStreamEndpoint = (credentials, subscriptionId, resourceGroupName, accountName, streamEndPointName) => {
    const mediaServices = new AzureMediaServices(credentials, subscriptionId);
    return mediaServices.streamingEndpoints.get(resourceGroupName, accountName, streamEndPointName)
}

module.exports = {
    getStreamEndpoint : getStreamEndpoint
}