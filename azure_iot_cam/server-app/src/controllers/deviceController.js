const deviceService = require('../services/azure-device-service');

const getDeviceStreamUrl = async (req, res) => {
    //const streamProtocol
    let streamURL = "";
  try {
        console.log("Get deviceIP call with deviceId:", req.params.id)
        const response = await deviceService.getDeviceIP(req.params.id)
        console.log("device IP :", response.result.payload)
        const ip = response.result.payload;
        if(ip){
            streamURL = "http://"+ ip + ":3000"
        }
        res.status(200).send(streamURL)
    } catch (e) {
        res.status(500).send(e)
    }
}


const device_streamurl_post = async (req, res) => {

    let streamURL = ""
    try {
        console.log("deviceId:" + req.body.device_id + " protocol: "+ req.body.protocol)
        const response = await deviceService.getDeviceIP(req.body.device_id)
        // console.log(response)
        console.log("device IP :", response.result.payload)
        const ip = response.result.payload;
        if(ip){
            streamURL = req.body.protocol + "://" + ip + ":3000"
        }
        res.status(200).send(streamURL)
        
    } catch (e) {
        res.status(500).send(e)
    }

}

module.exports = {
    device_streamurl_post
    //getDeviceStreamUrl
}  