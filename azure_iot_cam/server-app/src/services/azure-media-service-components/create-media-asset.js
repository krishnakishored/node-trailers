import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import {AzureMediaServices, AzureMediaServicesModels, AzureMediaServicesMappers} from "@azure/arm-mediaservices";

const createMediaAsset = (credentials, subscriptionId, storageAccountName, resourceGroupName, accountName, assetName) => {

    const mediaServices = new AzureMediaServices(credentials, subscriptionId);
                
    const storageParams = {
        properties: {
        description: "Inseego Asset for 5g360 Camera",
        storageAccountName: storageAccountName
        }
    }

    return mediaServices.assets.createOrUpdate(resourceGroupName, accountName, assetName, storageParams) ;
}

module.exports = {
    createMediaAsset : createMediaAsset
}