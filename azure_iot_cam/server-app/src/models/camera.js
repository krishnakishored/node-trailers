const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// var AMSSchema = new Schema(
//   {
//     ingest_url:{type:String, maxlength:100 },    
//     streaming_url:{type:String, maxlength:100 }  
//   }
// )

const AzureMediaServices = new Schema(
  {
    ingest_url : {type:String, maxlength:100, trim:true},    
    streaming_url : {type:String, maxlength:100,trim:true },//locator_url
    live_event_name : {type:String, maxlength:100,trim:true }, 
    asset_name : {type:String, maxlength:100,trim:true },
    live_output_name : {type:String, maxlength:100,trim:true },
    stream_locator_name : {type:String, maxlength:100,trim:true }    
  }
)
  
var CameraSchema = new Schema(
  {
    camera_name: {type: String, required: true, maxlength: 50, trim:true},    
    registered_cameragroup_name: {type: String, required: true, maxlength: 50, trim:true},    
    registered_user_name: {type: String, required: true, maxlength: 50, trim:true},  // ToDo: Change this to an array of users based on login(jwt)  
    //azure media services record as a sub-document
    ams_resources:[AzureMediaServices] 
  }
);

module.exports = mongoose.model('Camera', CameraSchema);