const express = require('express');
const router = express.Router();
const multer  = require('multer')

// Check file upload - using this multer middlerware
const upload = multer({
    'dest':'avatars', // uploads destinataion folder
    'limits':{
        fileSize:10000000 // in Bytes  // restrict to 10MB
    },
    fileFilter(req,file,cb){
        if (!file.originalname.match(/\.(json|pdf|csv|jpg|png)$/)){
        // if (!file.originalname.endsWith('.pdf')){
            return cb(new Error('File extension not allowed'))
        }

        cb(undefined,true) //callback to accept the given file
    }
})

const errorMiddleware = (req,res,next) => {
    throw new Error('From my middleware')
}

router.post('/', upload.single('avatar') ,(req, res) => { 
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
