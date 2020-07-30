const express = require('express');
const router = express.Router();
const timelog = require('../middleware/timelog')

// const request_transformer = require('../middleware/request-transfomer')

router.all('/:group', timelog, (req, res) => { //as is without request-transformer middleware
// router.all('/', timelog,request_transformer, (req, res) => {
    let echo_response = {   }
    let gateway_headers = req.headers
    const gateway_keys = ['x-account-id', 'x-account-name', 'x-billing-name','x-consumer-status','x-key-id','x-service-name','x-function-path']

    // const filtered = Object.keys(req.headers)
    //     .filter(key => gateway_keys.includes(key))
    //     .reduce((obj, key) => {
    //         obj[key] = gateway_headers[key];
    //         return obj;
    //     }, {});

    echo_response.message = "You are viewing group data"
    const filtered = gateway_keys
        .reduce((obj, key) => ({ ...obj, [key]: gateway_headers[key] }), {});
      
    echo_response.gateway_headers = filtered
    echo_response.apikey = req.query.apikey
    echo_response.id = req.params.group
    // echo_response.filename = req.params.filename
    
    // echo_response.request_method = req.method
    res.status(200).send(echo_response)
})

module.exports = router;

// ----------------------------------------------------------------------------
