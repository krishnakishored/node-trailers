import {AzureMediaServices, AzureMediaServicesModels, AzureMediaServicesMappers} from "@azure/arm-mediaservices";


const listStreamPaths = (credentials, subscriptionId, resourceGroupName, accountName, streamLocatorName ) => {

    const mediaServices = new AzureMediaServices(credentials, subscriptionId);
    return mediaServices.streamingLocators.listPaths(resourceGroupName, accountName, streamLocatorName)
}

module.exports = {
    listStreamPaths : listStreamPaths
}