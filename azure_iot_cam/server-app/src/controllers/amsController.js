const azureMediaService = require('../services/azure-media-service')
const regeneratorRuntime = require("regenerator-runtime"); //ReferenceError: regeneratorRuntime is not defined
const Ams = require('../models/ams')

const ams_defaults_create_post = async(req,res)=>{
    const ams = new Ams(req.body)
    try{
        await ams.save()
        res.status(201).send({ams})

    }
    catch(e){
        res.status(500).send(e)
    }
}




// takes cameraID as input & returns livestreamurl
const livestream_create_post =  async (req, res) => {
    console.log("start livestream for camera : ", req.body.cameraName)
    let liveUrl = "Default URL"
    try{
        liveUrl =  await azureMediaService.liveStream(req.body.cameraName)
    }catch(e){
        console.log("live stream request error : ", e)
        res.status(500).send(e)
    }
    res.status(200).send(liveUrl)
}


const livestream_stop_post = async (req,res) => {
    console.log(" liveEventName : ", req.params.liveEventName)
    try{
        await azureMediaService.stopLiveStream(req.params.liveEventName)
    }catch(e){
        res.status(500).send(e)
    }
    res.status(200).send("LiveStream Stopped Successfully!")
}

const mediaasset_create_post = async (req, res) => {
    console.log("start live stream for camera : ", req.params.cameraName)
    let mediaAsset = null
    try{
        mediaAsset =  await azureMediaService.createMediaAsset()
    }catch(e){
        console.log("live stream request error : ", e)
        res.status(500).send(e)
    }
    res.status(200).send(mediaAsset)
}


const livestream_url_fetch_post = async (req, res) => {
    const streamLocatorName = req.body.locatorName
    console.log("get locator name : ", streamLocatorName )
    let liveUrl = null
    try{
        liveUrl =  await azureMediaService.getLocatorUrl(streamLocatorName)
    }catch(e){
        console.log("live stream request error : ", e)
        res.status(500).send(e)
    }
    res.status(200).send(liveUrl)
}

// const createAMSResources = async(req,res)=>{

// }

module.exports = {
    livestream_create_post,
    livestream_stop_post,
    mediaasset_create_post,
    livestream_url_fetch_post,
    ams_defaults_create_post
}
