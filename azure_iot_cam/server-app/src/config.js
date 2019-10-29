require('dotenv').config();


const port = process.env.PORT || 3000;
// console.log(`Your port is ${process.env.PORT}`); 

const host = process.env.MONGODB || "mongodb://localhost:27017/AzureAICamera"

//Azure Media Services Constants
const resourceGroupName = process.env.RESOURCE_GROUP_NAME || "IOT5g360ResourceGroup"
const accountName = process.env.ACCOUNT_NAME || "amsiot5g360"
const aadClientId = process.env.AAD_CLIENT_ID||  "ced8d263-4e63-4875-99e7-53291b139683"
const aadSecret =  process.env.AAD_SECRET || "059d41c9-4c1d-4244-9ee1-536216640177"
const aadTenantId =  process.env.AAD_TENANT_ID || "4984ed6c-2b33-4532-b600-4eceb5b87a74"
const armAadAudience = process.env.ARM_ADD_AUDIENCE || "https://management.core.windows.net/"
const armEndpoint = process.env.ARM_ENDPOINT || "https://management.azure.com/"
const aadEndpoint = process.env.AAD_ENDPOINT || "https://login.microsoftonline.com/"
const subscriptionId = process.env.SUBSCRIPTION_ID || "109645b2-cbd0-449b-a07d-f09169bcba66"
const streamEndPointName = process.env.STREAM_ENDPOINT_NAME || "default"
const storageAccountName = process.env.STORAGE_ACCOUNT_NAME || "storageaccountiot5g360"

// Azure IoTHub Constants
const serviceConnectionString = process.env.SERVICE_CONNECTION_STRING || "HostName=AI-CAMERA-NEW.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=aDjj1zg/AgtaGtG9k6eGLrMOt2/us8sJe/LgOBuukXk=" 
const deviceConnectionString = process.env.DEVICE_CONNECTION_STRING || "=HostName=AI-CAMERA-NEW.azure-devices.net;DeviceId=MSIoT0DBA07;SharedAccessKey=hOefyLBgIOe2j8WZU4OJN5XQpoU/ye3YwkI2fs/+UDA="


const config = {
    app: {
      port
    },
    db: {
      host
    },
    ams:{
      resourceGroupName,
      accountName,
      aadClientId,
      aadSecret,
      aadTenantId,
      armAadAudience,
      armEndpoint,
      aadEndpoint,
      subscriptionId,
      streamEndPointName,
      storageAccountName,
    },
    iothub:{
      serviceConnectionString,
      deviceConnectionString
    }
};


module.exports=config