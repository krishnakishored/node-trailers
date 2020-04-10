const config = require('../config')

const express = require('express');
const router = express.Router();
const timelog = require('../middleware/timelog')
const request_transformer = require('../middleware/request-transfomer')


router.all('/',request_transformer,timelog,(req,res)=>{
    //only status is a GET method
    if(req.method == 'GET'){
        res.redirect(config.app.upstream_status_url)  
    }
    else{
        // console.log('req:'+ req.originalUrl)
        //ToDo: switch based on req.body 
        console.log(JSON.stringify(req.body))
        // 307 guarantees that the method and the body will not be changed when the redirected request is made.
        res.redirect(307,config.app.upstream_calculate_url)  
    }
})


// router.post('/', timelog, (req, res) => {
//     console.log('req:'+ req.baseUrl)
//     // console.log(config.app.upstream_calculate_url)
//     // 307 guarantees that the method and the body will not be changed when the redirected request is made.
//     res.redirect(307,config.app.upstream_calculate_url)  
// })
// router.get('/', timelog, (req, res) => {
//     console.log('req:'+ req.baseUrl)
//     // console.log(config.app.upstream_status_url)
//     res.redirect(config.app.upstream_status_url)  
// })


module.exports = router;

// ----------------------------------------------------------------------------
