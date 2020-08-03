const config = require('../config')
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.all('/*',async (req,res) =>{

    try {

        // let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        let originalUrl = req.originalUrl;
        console.log("originalUrl: " + originalUrl)
        console.log('req.path: '+ req.path)
        let translate_header = ['x-api-key']
        translate_header = req.headers
        apikey_from_header = translate_header['x-api-key']
        // console.log(apikey_from_header)
        if (req.path.includes('default') || (req.path.includes(apikey_from_header)) )
        {
            translate_header['x-auth-match']  = "true"    
        }
        else{
            // translate_header['x-auth-match']  = "false"
            return res.status(403).send({"status":"Access Denied"})    
        }
        
        redirect_url = config.app.upstream_url // append the path from request
        redirect_url = redirect_url + '/osm/mb' +req.path // hardcoded data source path for now - '/osm/mb'
        console.log("redirect_url: "+ redirect_url)
        let payload = {
            'method': req.method,
            'url': redirect_url,
            'headers': translate_header,
            'data': req.body
        };
    
        const response = await axios(payload)
        // console.log(response)
        res.status(response.status).send(response.data)
        
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

// router.all('/', (req, res) => {

//     // //ToDo: switch based on req.body 
//     // if (req.method == 'GET') {
//     //     // only status is a GET method
//     //     // res.redirect(config.app.upstream_status_url)  // res.redirect() works for get requests
//     //     var redirect_url = config.app.upstream_status_url
//     // } else {
//     //     redirect_url = config.app.upstream_calculate_url
//     // }
    
//     // console.log(JSON.stringify(req.body))
//     // 307 guarantees that the method and the body will not be changed when the translateed request is made.
//     // res.redirect(307,config.app.upstream_calculate_url)  // ToDo: Did not work as expected

//     redirect_url = config.app.upstream_url
//     console.log(redirect_url)
//     let translate_header = {}
//     translate_header = req.headers
//     translate_header['X-Auth-Match'] = 'Yes' //Todo: add custome header based on some logic
    
//     // console.log(req.headers)
//     let payload = {
//         'method': req.method,
//         'url': redirect_url,
//         'headers': translate_header,
//         body: JSON.stringify(req.body)
//     };


//     //Todo: use axios instead of request, which support async/await

//     // axios({
//     //     url: 'https://dog.ceo/api/breeds/list/all',
//     //     method: 'get'
//     //   })

//     (async () => {
//         response = await axios(payload)
//         console.log(response.data)
//     })()
// })

module.exports = router;