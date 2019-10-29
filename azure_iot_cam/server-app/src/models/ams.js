const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AMSSchema = new Schema(
  {
    ingest_url : {type:String, maxlength:100, trim:true},    
    streaming_url : {type:String, maxlength:100,trim:true },//locator_url
    live_event_name : {type:String, maxlength:100,trim:true }, 
    asset_name : {type:String, maxlength:100,trim:true },
    live_output_name : {type:String, maxlength:100,trim:true },
    stream_locator_name : {type:String, maxlength:100,trim:true }    
  }
)

module.exports = mongoose.model('AMS', AMSSchema);
/**
 * 
const Camera = mongoose.model('Camera', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    liveEventName:{
        type: String,
        required: true,
        trim: true
    },
    assetName: {
        type: String,
        required: true,
        trim: true
    },
    liveOutPutName : {
        type: String,
        required: true,
        trim: true
    },
    streamLocatorName: {
        type: String,
        required: true,
        trim: true
    },
    locatorURL:{
        type: String,
        required: true,
        trim: true
    }
})

module.exports = Camera
 */