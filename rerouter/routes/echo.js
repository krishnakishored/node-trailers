const express = require('express');
const router = express.Router();
const timelog = require('../middleware/timelog')

const request_transformer = require('../middleware/request-transfomer')

router.all('/', timelog,request_transformer, (req, res) => {
    let echo_response = {   }
    echo_response.request_body = req.body
    echo_response.request_headers = req.headers
    res.status(200).send(echo_response)
})

module.exports = router;

// ----------------------------------------------------------------------------
