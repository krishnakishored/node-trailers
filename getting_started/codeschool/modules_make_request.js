///////////////////////////////////////////////////////////////////////////////
// var http = require('http');
// var message = "Here's looking at you, kid.";
// var options = {
//   host: 'localhost', port: 8080, path: '/', method: 'POST'
// }
// var request = http.request(options, function(response){
//   response.on('data', function(data){
//      console.log(data); // logs response body
//   });
// });

// request.write(message); // begins request
// request.end(); // finishes request
///////////////////////////////////////////////////////////////////////////////
//Encapsulating the function
var http = require('http')
var makeRequest = function(message){
    var options = {
        host:'localhost', port:'8080',path:'/', method:'POST'
    }

    var request = http.request(options, function(response){
        response.on('data',function(data){
            console.log(data)
        })
    })
    request.write(message)
    request.end()
}

// makeRequest("Here's looking at you, kid")
module.exports = makeRequest
///////////////////////////////////////////////////////////////////////////////
// var make_request = require('./make_request') // look in same directory
// var make_request = require('../make_request') // look in parent directory
// var make_request = require('make_request') // search in node_modules directories
///////////////////////////////////////////////////////////////////////////////

