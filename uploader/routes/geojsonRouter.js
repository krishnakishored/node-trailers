const express = require('express');
const config = require('../config')
const fs = require('fs')
const path = require('path')
const router = express.Router();
const output_location = config.app.output_location

const multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {


    const dir_path = path.join(output_location,req.params.userid)
    !fs.existsSync(dir_path) && fs.mkdirSync(dir_path);


    cb(null, dir_path)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
        console.log(file.originalname)
        cb(null, file.originalname)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  
  // // Check file upload - using this multer middlerware
  var upload = multer({ 
      storage: storage,
      'limits':{
        fileSize:10000000 // in Bytes  // restrict to 10MB
      },
      fileFilter(req,file,cb){
        if (!file.originalname.match(/\.(json|geojson)$/)){
        // if (!file.originalname.endsWith('.pdf')){
            return cb(new Error('File extension not allowed'))
        }
        cb(undefined,true) //callback to accept the given file
    } 

})


const errorMiddleware = (req,res,next) => {
    throw new Error('From my middleware')
}

router.post('/:userid', upload.single('avatar') ,(req, res) => { 
    // router.post('/',errorMiddleware,(req, res) => { 
        res.status(200).send()
        // console.log(error)        
},
//error handler for middleware errors
(error,req,res,next)=>{
    console.log(error.message)
    return res.status(400).send({'upstream_error':error.message})
})

module.exports = router;

// ----------------------------------------------------------------------------
