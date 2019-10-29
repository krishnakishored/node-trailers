import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import {AzureMediaServices, AzureMediaServicesModels, AzureMediaServicesMappers} from "@azure/arm-mediaservices";

const createLiveOutPut = (credentials, subscriptionId, assetName, resourceGroupName, accountName, liveEventName, liveOutPutName) => {

    const mediaServices = new AzureMediaServices(credentials, subscriptionId);
                
    const params = {
            description: "inseego test live output 1",
            assetName: assetName,
            archiveWindowLength: "PT5M",
            manifestName: "inseegoTestManifest",
            hls: {
            "fragmentsPerTsSegment": 5
            }    
    }

    return mediaServices.liveOutputs.create(resourceGroupName, accountName, liveEventName, liveOutPutName, params)
}

module.exports = {
    createLiveOutPut : createLiveOutPut
}