const express = require('express');
const router = express.Router();
const timelog = require('../middleware/timelog')

router.all('/', timelog, (req, res) => { //as is without request-transformer middleware
// router.all('/', timelog,request_transformer, (req, res) => {
    let echo_response = {   }
    // let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    echo_response.message = "You are viewing public data"
    echo_response.apikey = req.query.apikey
    // echo_response.id = req.params.id
    echo_response.body = req.body
    // echo_response.filename = req.params.filename

    res.status(200).send(echo_response)
})

module.exports = router;

// ----------------------------------------------------------------------------
