const iothub = require('azure-iothub')
const regeneratorRuntime = require("regenerator-runtime");

const config = require('../config')

const connectionString = config.iothub.serviceConnectionString
// const connectionString = 'HostName=AI-CAMERA-NEW.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=aDjj1zg/AgtaGtG9k6eGLrMOt2/us8sJe/LgOBuukXk=';


const Client = iothub.Client

const sendURLToDevice =  (ingestURL) => {
    const methodParams = {
        methodName: 'StreamVideo',
        payload: ingestURL
    };
    //methodParams.payload = ingestURL
    //console.log("methodParams : ", methodParams)
    let result = null
    try{
       const client_conn =  Client.fromConnectionString(connectionString); 
       result = client_conn.invokeDeviceMethod(deviceId, methodParams)
    }catch(e){
        console.log("Device send error : ", e)
    }
    console.log(JSON.stringify(result, null, 2));
    return result
}

const getDeviceIP = async (deviceId) => {
    let result = ""
    const methodParams = {
        methodName: 'sendDeviceIP',
        payload: ""
    };
    try{
        const client_conn =  await Client.fromConnectionString(connectionString); 
        result = await client_conn.invokeDeviceMethod(deviceId, methodParams)
        // console.log(client_conn)
        console.log(result)
        console.log('----> Response from ' + methodParams.methodName + ' on ' + deviceId + ':');
        console.log(JSON.stringify(result, null, 2));
     }catch(e){
         console.log("Device send error : ", e)
     }
     
     return result;
}


module.exports = {
    sendURLToDevice : sendURLToDevice,
    getDeviceIP : getDeviceIP
}