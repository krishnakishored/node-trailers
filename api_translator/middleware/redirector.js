const config = require('../config')
const request = require('request');


const redirector = function (req, res, next) {

     //ToDo: switch based on req.body 
    if (req.method == 'GET') {
      // only status is a GET method
      // res.redirect(config.app.upstream_status_url)  // res.redirect() works for get requests
      var redirect_url = config.app.upstream_status_url
    } else {
        redirect_url = config.app.upstream_calculate_url
    }
    
    //ToDo: switch based on req.body 
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

    request(options, function (error, response) {
      if (error) throw new Error(error);
      // console.log(response.body);
      const translate_response = translate_header['content-type'].includes('json') ? JSON.parse(response.body) : response.body
        res.status(200).send(translate_response) 
      // res.body = translate_response
      // console.log(res.body)
    });

    next()
    
  }

module.exports = redirector

//------------------------- using request
// var request = require('request');
// var options = {
//   'method': 'POST',
//   'url': 'https://apis.location.studio/ilp/positioning/v1.2/calculate',
//   'headers': {
//     'api_key': 'CLnVXKYwRCGd87xQqH0MU34dNQPuJUze_zj9PiDl',
//     'Content-Type': ['application/json']
//   },
//     body: "{\n \"typeShape\": 31,\n \"encObs\": 0,\n \"devid\": \"Postman ILP Test Suite\",\n \"observations\": {\n     \"observations\": [\n  {\n      \"epoch\": \"2020-04-13T07:29:55.795Z\",\n      \"mac\": [\n   108,\n   114,\n   32,\n   207,\n   133,\n   34\n      ],\n      \"rss\": 45,\n      \"type\": 14\n  },\n  {\n      \"epoch\": \"2020-04-13T07:29:55.795Z\",\n      \"mac\": [\n   28,\n   95,\n   43,\n   98,\n   20,\n   109\n      ],\n      \"rss\": 65,\n      \"type\": 14\n  },\n  {\n      \"epoch\": \"2020-04-13T07:29:55.795Z\",\n      \"mac\": [\n   200,\n   58,\n   53,\n   50,\n   215,\n   112\n      ],\n      \"rss\": 91,\n      \"type\": 14\n  },\n  {\n      \"epoch\": \"2020-04-13T07:29:55.795Z\",\n      \"mac\": [\n   108,\n   114,\n   32,\n   67,\n   81,\n   31\n      ],\n      \"rss\": 84,\n      \"type\": 14\n  }\n     ]\n }\n    }\n"

// };
// request(options, function (error, response) { 
//   if (error) throw new Error(error);
//   console.log(response.body);
// });

// //------------------------- using native 
// var https = require('follow-redirects').https;

// var options = {
//   'method': 'POST',
//   'hostname': 'http://localhost:4444',
//     // 'hostname': 'https://apis.location.studio/ilp/positioning/v1.2/calculate',
//   'path': '/',
//   'headers': {
//     'api_key': 'CLnVXKYwRCGd87xQqH0MU34dNQPuJUze_zj9PiDl',
//     'Content-Type': ['application/json', 'text/plain']
//   },
//   'maxRedirects': 20
// };

// var req = https.request(options, function (res) {
//   var chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function (chunk) {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });

//   res.on("error", function (error) {
//     console.error(error);
//   });
// });

// var postData =  "{\n    \"typeShape\": 31,\n\t\"encObs\": 0,\n    \"idDevice\": \"Postman ILP Test Suite\",\n    \"observations\": {\n        \"observations\": [\n            {\n                \"epoch\": \"2020-04-13T07:29:55.795Z\",\n                \"macaddr\": [108,114,32,207,133,34],\n                \"rssi\": 45,\n                \"type\": 14\n            },\n            {\n                \"epoch\": \"2020-04-13T07:29:55.795Z\",\n                \"macaddr\": [28,95,43,98,20,109],\n                \"rssi\": 65,\n                \"type\": 14\n            },\n            {\n                \"epoch\": \"2020-04-13T07:29:55.795Z\",\n                \"macaddr\": [200,58,53,50,215,112],\n                \"rssi\": 91,\n                \"type\": 14\n            },\n            {\n                \"epoch\": \"2020-04-13T07:29:55.795Z\",\n                \"macaddr\": [108,114,32,67,81,31],\n                \"rssi\": 84,\n                \"type\": 14\n            }\n        ]\n    }\n}\n";

// req.write(postData);

// req.end();
//-------------------------

// const config = require('../config')

// const { createProxyMiddleware } = require('http-proxy-middleware');
// const api_proxy = createProxyMiddleware({ target: config.app.upstream_calculate_url, changeOrigin: true });

// module.exports = api_proxy

//-------------------------

// // include dependencies
// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// // proxy middleware options
// const options = {
//   target: 'http://www.example.org', // target host
//   changeOrigin: true, // needed for virtual hosted sites
//   ws: true, // proxy websockets
// //   pathRewrite: {
// //     '^/api/old-path': '/api/new-path', // rewrite path
// //     '^/api/remove/path': '/path', // remove base path
// //   },
//   router: {
//     // when request.headers.host == 'dev.localhost:3000',
//     // override target 'http://www.example.org' to 'http://localhost:8000'
//     'dev.localhost:3000': 'http://localhost:8000',
//   },
// };

// // create the proxy (without context)
// const exampleProxy = createProxyMiddleware(options);

// // mount `exampleProxy` in web server
// const app = express();
// app.use('/api', exampleProxy);
// app.listen(3000);