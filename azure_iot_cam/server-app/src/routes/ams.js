// Azure media services router
const express = require("express")
// const azureMediaService = require("../services/azure-media-service")
const amsController = require('../controllers/amsController')

const router = express.Router()

router.get('/',(req,res)=>{
    res.send("Hello AMS")
})


// router.post("/live-stream/:cameraName",amsController.createLiveStream)
router.post("/live-stream/",amsController.livestream_create_post)
router.post("/stop-live-stream/:liveEventName", amsController.livestream_stop_post )
router.post("/create-media-assset", amsController.mediaasset_create_post)
router.post("/get-live-stream-url/:locatorName",amsController.livestream_url_fetch_post)
router.post("/create-default-ams-resources",amsController.ams_defaults_create_post)
module.exports = router