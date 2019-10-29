require("@babel/register")({
    presets: ["@babel/preset-env"]
});

require("../db/mongoose")

const config = require('../config')
// import {ams} from '../config'



const Camera = require("../models/camera")
const uuidv4 = require('uuid/v4');
const azure_device_service = require('./azure-device-service')
const azure_login = require('../services/azure-media-service-components/login')

const azure_create_live_event = require("../services/azure-media-service-components/create-live-event")
const azure_get_live_event = require("../services/azure-media-service-components/get-live-event")
const azure_start_live_event = require("../services/azure-media-service-components/start-live-event")
const azure_create_media_asset = require("../services/azure-media-service-components/create-media-asset")
const azure_create_live_output = require("../services/azure-media-service-components/create-live-output")
const azure_create_stream_locator = require("../services/azure-media-service-components/create-streaming-locator")
const azure_list_stream_paths = require("../services/azure-media-service-components/list-stream-path")
const azure_get_stream_endpoint = require("../services/azure-media-service-components/get-stream-endpoint")
const azure_stop_live_event = require("../services/azure-media-service-components/stop-live-event")



//============ Constants ===================
// console.log(config.ams)
const resourceGroupName = config.ams.resourceGroupName
const accountName = config.ams.accountName
const aadClientId = config.ams.aadClientId
const aadSecret = config.ams.aadSecret
const aadTenantId = config.ams.aadTenantId
const armAadAudience = config.ams.armAadAudience
const armEndpoint = config.ams.armEndpoint
const aadEndpoint = config.ams.aadEndpoint
const subscriptionId = config.ams.subscriptionId
const streamEndPointName = config.ams.streamEndPointName
const storageAccountName = config.ams.storageAccountName

//========== create dynamic values ================
let liveEventName = "inseego5g360LiveEvent"
let assetName = "inseego5g360Asset"
let liveOutPutName = "inseego5g360LiveOutPut"
let streamLocatorName = "inseego5g360StreamLocator"

/**
 * Create Live Stream media resources and return Streaming URL
 * @param {*} cameraName 
 */
const liveStream = async (cameraName) => {
        
        // let uniqueness = uuidv4();

        // liveEventName += "-" + uniqueness
        // assetName += "-" + uniqueness
        // liveOutPutName += "-" + uniqueness
        // streamLocatorName += "-" + uniqueness
        // console.log("All resources : ", liveEventName, assetName, liveOutPutName, streamLocatorName)

        //============ Azure Login
        // let credentials = null
        // try{
        //     credentials = await azure_login.login(aadClientId, aadSecret, aadTenantId, armAadAudience, armEndpoint, aadEndpoint)
        // }catch(e){
        //     console.log("Login failed with error : ", e)
        // }
        
        // console.log(credentials)
        
        //============ Create Live Event
        // console.log("liveEventName : ", liveEventName)
        // try{
        //     const createLiveEvent = await azure_create_live_event.createLiveEvent(credentials, subscriptionId, resourceGroupName, accountName, liveEventName)
        //     console.log("createLiveEvent : ", createLiveEvent)
        // }catch(e){
        //     console.log("Live event creation failed with error : ", e)
        // }
        
        //============ Start Live Event
        // console.log("liveEvent Starting : ", liveEventName)
        // try{
        //     const startLiveEvent = await azure_start_live_event.startLiveEvent(credentials, subscriptionId, resourceGroupName, accountName, liveEventName)
        //     console.log("startLiveEvent : ", startLiveEvent)
        // }catch(e){
        //     console.log("Live event start failed with error : ", e)
        // }
        
        //============ Get Live Event
        // let getLiveEvent = null
        // try{
        //      getLiveEvent = await azure_get_live_event.getLiveEvent(credentials, subscriptionId, resourceGroupName, accountName, liveEventName)
        // }catch(e){
        //     console.log("Get LiveEvent failed with error : ", e)
        // }
        // console.log("getLiveEvent : ", getLiveEvent)
        // let ingestURL = getLiveEvent.input.endpoints[0].url
        // let previewURL = getLiveEvent.preview.endpoints[0].url
        // console.log("Ingest URL : ", ingestURL)
        // console.log("Preview URL : ", previewURL)
        
        //============ Create Asset
        // console.log("assetName : ", assetName)
        // try{
        //     const createMediaAsset = await azure_create_media_asset.createMediaAsset(credentials, subscriptionId, storageAccountName, resourceGroupName, accountName, assetName)
        //     console.log("createMediaAsset : ", createMediaAsset)
        // }catch(e){
        //     console.log("Create Asset failed with error : ", e)
        // }
        

        //=========== Create Live Output
        // console.log("liveOutPutName : ", liveOutPutName)
        // try{
        //     const createLiveOutPut = await azure_create_live_output.createLiveOutPut(credentials, subscriptionId, assetName, resourceGroupName, accountName, liveEventName, liveOutPutName)
        //     console.log("createLiveOutPut : ", createLiveOutPut)
        // }catch(e){
        //     console.log("Create LiveOutPut failed with error : ", e)
        // }
        

        //============ Create Streaming Locator
        // console.log("streamLocatorName : ", streamLocatorName)
        // try{
        //     const createStreamLocator = await azure_create_stream_locator.createStreamingLocator(credentials, subscriptionId, assetName, resourceGroupName, accountName, streamLocatorName)
        //     console.log("createStreamLocator", createStreamLocator)
        // }catch(e){
        //     console.log("Create Stream Locator failed with error : ", e)
        // }
        
        //============ Device Call
        // const IngestURL = "rtmp://719aea3f5558488bbcc40e67bfc128d2.channel.media.azure.net:1935/live/79d01ab426ea4d82a81b9a3b329bc177"
        // await azure_device_service.sendURLToDevice(IngestURL)


        //============ List path for Streaming Locator
        // let listStreamPaths = null
        // try{
        //     listStreamPaths = await azure_list_stream_paths.listStreamPaths(credentials, subscriptionId, resourceGroupName, accountName, streamLocatorName)
        // }catch(e){
        //     console.log("List Stream Paths failed with error : ", e)
        // }
        // console.log("listStreamPaths : ", listStreamPaths)
         
        //  let streamPath = "";
        //  listStreamPaths.streamingPaths.forEach(element => {
        //     if(element.streamingProtocol === "SmoothStreaming"){
        //         streamPath = element.paths[0]
        //     }
        // });
        // console.log("Stream Path : ", streamPath)

        //============ Get Stream Endpoint
        // let getStreamEndPoint = null
        // try{
        //    getStreamEndPoint = await azure_get_stream_endpoint.getStreamEndpoint(credentials, subscriptionId, resourceGroupName, accountName, streamEndPointName)
        // }catch(e){
        //     console.log("Get Stream EndPoint failed with error : ", e)
        // }
        // console.log("getStreamEndPoint : ", getStreamEndPoint)

        // let hostName = getStreamEndPoint.hostName
        // console.log("hostName : ", hostName)

        //============= Create Locator URL
        // let locatorURL = "https://"+ hostName + streamPath
        
        //============== Save Media Service Details
        // const cameraInfo = {
        //     name: cameraName,
        //     liveEventName: liveEventName,
        //     assetName: assetName,
        //     liveOutPutName: liveOutPutName,
        //     streamLocatorName: streamLocatorName,
        //     locatorURL: locatorURL    
        // }
        // const camera = new Camera(cameraInfo)
        // await camera.save()

        
        return console.log("livestream URL")
        
}
// called when a camera device is added
const createMediaAsset = async () => {
        let uniqueness = 5;

        liveEventName += "-" + uniqueness
        assetName += "-" + uniqueness
        liveOutPutName += "-" + uniqueness
        streamLocatorName += "-" + uniqueness
        console.log("All resources : ", liveEventName, assetName, liveOutPutName, streamLocatorName)

        // ============ Azure Login
        let credentials = null
        try{
            credentials = await azure_login.login(aadClientId, aadSecret, aadTenantId, armAadAudience, armEndpoint, aadEndpoint)
        }catch(e){
            console.log("Login failed with error : ", e)
        }
        
        console.log(credentials)
        
        // ============ Create Live Event
        console.log("liveEventName : ", liveEventName)
        try{
            const createLiveEvent = await azure_create_live_event.createLiveEvent(credentials, subscriptionId, resourceGroupName, accountName, liveEventName)
            console.log("createLiveEvent : ", createLiveEvent)
        }catch(e){
            console.log("Live event creation failed with error : ", e)
        }
        
        // ============ Start Live Event
        console.log("liveEvent Starting : ", liveEventName)
        try{
            const startLiveEvent = await azure_start_live_event.startLiveEvent(credentials, subscriptionId, resourceGroupName, accountName, liveEventName)
            console.log("startLiveEvent : ", startLiveEvent)
        }catch(e){
            console.log("Live event start failed with error : ", e)
        }
        
        // ============ Get Live Event
        let getLiveEvent = null
        try{
             getLiveEvent = await azure_get_live_event.getLiveEvent(credentials, subscriptionId, resourceGroupName, accountName, liveEventName)
        }catch(e){
            console.log("Get LiveEvent failed with error : ", e)
        }
        console.log("getLiveEvent : ", getLiveEvent)
        let ingestURL = getLiveEvent.input.endpoints[0].url
        let previewURL = getLiveEvent.preview.endpoints[0].url
        console.log("Ingest URL : ", ingestURL)
        console.log("Preview URL : ", previewURL)
        
        // ============ Create Asset
        console.log("assetName : ", assetName)
        try{
            const createMediaAsset = await azure_create_media_asset.createMediaAsset(credentials, subscriptionId, storageAccountName, resourceGroupName, accountName, assetName)
            console.log("createMediaAsset : ", createMediaAsset)
        }catch(e){
            console.log("Create Asset failed with error : ", e)
        }
        

        // =========== Create Live Output
        console.log("liveOutPutName : ", liveOutPutName)
        try{
            const createLiveOutPut = await azure_create_live_output.createLiveOutPut(credentials, subscriptionId, assetName, resourceGroupName, accountName, liveEventName, liveOutPutName)
            console.log("createLiveOutPut : ", createLiveOutPut)
        }catch(e){
            console.log("Create LiveOutPut failed with error : ", e)
        }
        

        // ============ Create Streaming Locator
        console.log("streamLocatorName : ", streamLocatorName)
        try{
            const createStreamLocator = await azure_create_stream_locator.createStreamingLocator(credentials, subscriptionId, assetName, resourceGroupName, accountName, streamLocatorName)
            console.log("createStreamLocator", createStreamLocator)
        }catch(e){
            console.log("Create Stream Locator failed with error : ", e)
        }
        const mediaAsset = {
            liveEventName: liveEventName,
            locatorName: streamLocatorName,
            ingestURL:ingestURL
        }
        return mediaAsset
}
// return the livestrea url 
const getLocatorUrl = async (streamLocatorName) => {

    let credentials = null
    try{
        credentials = await azure_login.login(aadClientId, aadSecret, aadTenantId, armAadAudience, armEndpoint, aadEndpoint)
        console.log("credentials : ", credentials)
    }catch(e){
        console.log("Login failed with error : ", e)
    }
        //============ List path for Streaming Locator
        let listStreamPaths = null
        try{
            listStreamPaths = await azure_list_stream_paths.listStreamPaths(credentials, subscriptionId, resourceGroupName, accountName, streamLocatorName)
        }catch(e){
            console.log("List Stream Paths failed with error : ", e)
        }
        console.log("listStreamPaths : ", listStreamPaths)
         
         let streamPath = "";
         listStreamPaths.streamingPaths.forEach(element => {
            if(element.streamingProtocol === "SmoothStreaming"){
                streamPath = element.paths[0]
            }
        });
        console.log("Stream Path : ", streamPath)

        //============ Get Stream Endpoint
        let getStreamEndPoint = null
        try{
           getStreamEndPoint = await azure_get_stream_endpoint.getStreamEndpoint(credentials, subscriptionId, resourceGroupName, accountName, streamEndPointName)
        }catch(e){
            console.log("Get Stream EndPoint failed with error : ", e)
        }
        console.log("getStreamEndPoint : ", getStreamEndPoint)

        // let hostName = getStreamEndPoint.hostName
        // console.log("hostName : ", hostName)

        //============= Create Locator URL
        let locatorURL = "https://"+ hostName + streamPath

        return locatorURL
}

/**
 * Stop Live Streaming
 * @param {*} cameraName 
 */
const stopLiveStream = async (liveEventName) => { 
    console.log("liveEventName : ", liveEventName)

    // const camera = await Camera.findOne({name:cameraName})
    // if(!camera){
    //     throw new Error('Camera not found. Please provide a valid camera name')
    // }
    // liveEventName = camera.liveEventName
    // console.log(camera.liveEventName)
    
    //============ Azure Login

    let credentials = null
    try{
        credentials = await azure_login.login(aadClientId, aadSecret, aadTenantId, armAadAudience, armEndpoint, aadEndpoint)
    }catch(e){
        console.log("Login failed with error : ", e)
    }

    const stopLiveEvent = await azure_stop_live_event.stopLiveEvent(credentials, subscriptionId, resourceGroupName, accountName, liveEventName)
    return console.log("stopLiveEvent : ", stopLiveEvent)
}


//const createStream = liveStream()

//const stopStream = stopLiveStream()

module.exports = {
    stopLiveStream,
    liveStream,
    createMediaAsset,
    getLocatorUrl

}