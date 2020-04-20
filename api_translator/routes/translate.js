const config = require('../config')

const express = require('express');
const router = express.Router();
const timelog = require('../middleware/timelog')
const request_transformer = require('../middleware/request-transfomer')
// const redirector = require('../middleware/redirector')

const request = require('request');

// Add the router-level middlewares
router.use(timelog)
router.use(request_transformer) //(request_transfomer middleware handles the translation of the request)
// router.use(redirector)


/* Response transformer */
// v1.0: v1.2 // mapping for the old and new fields
const res_field_mapper = { 
    "estimates":"Estimates",
    "devid":"idDevice",
}

const replaceAll = function (str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

const response_transformer = function(response_body){

        //add fields with defaults to match v1.0 response
        response_body['rankEstimate'] =  0
        response_body['dynamics'] =  0

        //delete the additional fields ?? optional
        delete response_body['resultcode']

        let updated_response_body = JSON.stringify(response_body)
        for (key in res_field_mapper){
            updated_response_body = replaceAll(updated_response_body,key,res_field_mapper[key])
        }

        console.log(updated_response_body) 
        // req.body = updated_response_body
        return JSON.parse(updated_response_body)    
    
    // console.log(updated_response_body.replace('idDevice','devid'))
    // next()
}


/**
 * Translate v1.0 to v1.2 api 
 */
router.all('/', (req, res) => {

    //ToDo: switch based on req.body 
    if (req.method == 'GET') {
        // only status is a GET method
        // res.redirect(config.app.upstream_status_url)  // res.redirect() works for get requests
        var redirect_url = config.app.upstream_status_url
    } else {
        redirect_url = config.app.upstream_calculate_url
    }
    // console.log(JSON.stringify(req.body))
    // 307 guarantees that the method and the body will not be changed when the translateed request is made.
    // res.redirect(307,config.app.upstream_calculate_url)  // ToDo: Did not work as expected
    let translate_header = {}
    translate_header['api_key'] = req.headers['api_key']
    translate_header['content-type'] = !req.headers['Content-Type'] ? req.headers['content-type'] : req.headers['Content-Type']
    // console.log(req.headers)
    let options = {
        'method': req.method,
        'url': redirect_url,
        'headers': translate_header,
        body: JSON.stringify(req.body)
    };


    //Todo: use axios instead of request, which support async/await
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
        
        try{
            var translate_response = translate_header['content-type'].includes('json') ? JSON.parse(response.body) : response.body
        }
        catch (e) {
            console.log(e)
        }

        // res.status(200).send(translate_response)
        res.status(200).send(response_transformer(translate_response))
    });

})

module.exports = router;

// ----------------------------------------------------------------------------
