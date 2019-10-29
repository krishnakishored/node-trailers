'use strict';

var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;
var os = require('os');
var ifaces = os.networkInterfaces();

var connectionString = process.env.DEVICE_CONNECTION_STRING || "HostName=AI-CAMERA-NEW.azure-devices.net;DeviceId=MSIoT0DBA07;SharedAccessKey=hOefyLBgIOe2j8WZU4OJN5XQpoU/ye3YwkI2fs/+UDA="

var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

/**
 * Get Wi-Fi Device IP Address
 */
async function getIP(){
  console.log("ifaces -----> ", ifaces)
  return ifaces['wlan0'].filter( k => k.family === 'IPv4')[0].address;
}

/**
 * Send device IP address to IOTHub
 * @param {*} request
 * @param {*} response
 */
async function sendDeviceIP(request, response) {

  async function directMethodResponse(err) {
    if(err) {
      console.error('An error ocurred when sending a method response:\n' + err.toString());
    } else {
        console.log('Response to method \'' + request.methodName + '\' sent successfully.' );
    }
  }
    console.log("method call from service...");
    const ipAddress = await getIP();
    console.log("------> ip address :", ipAddress);
    response.send(200, ipAddress, directMethodResponse);
}


// Set up the handler for the SetTelemetryInterval direct method call.
client.onDeviceMethod('sendDeviceIP', sendDeviceIP);

/* ------------------------------------------------------------------------- */
// // To test the container 
// var http = require('http');
// //create a server object:
// http.createServer(function (req, res) {
//   res.write('Hello: ' + connectionString ); //write a response to the client
//   res.end(); //end the response
//   console.log(connectionString)
// }).listen(8080); //the server object listens on port 8080
/* ------------------------------------------------------------------------- */