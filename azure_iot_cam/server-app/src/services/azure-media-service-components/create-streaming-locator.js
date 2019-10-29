import {AzureMediaServices, AzureMediaServicesModels, AzureMediaServicesMappers} from "@azure/arm-mediaservices";

const createStreamingLocator = (credentials, subscriptionId, assetName, resourceGroupName, accountName, streamLocatorName) => {

    const mediaServices = new AzureMediaServices(credentials, subscriptionId);
                
    const params = {
            streamingPolicyName: "Predefined_ClearStreamingOnly",
            assetName: assetName,
            contentKeys: [],
            filters: []    
    }
    console.log(params)
    return mediaServices.streamingLocators.create(resourceGroupName, accountName, streamLocatorName, params)

}

module.exports = {
    createStreamingLocator : createStreamingLocator
}