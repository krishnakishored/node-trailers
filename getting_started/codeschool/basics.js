fs = require('fs')

// Blocking Code 
// var contents = fs.readFileSync('/etc/hosts');
// console.log(contents);
// console.log('Doing something else');

///////////////////////////////////////////////////////////////////////////////
// Non-Blocking Code
// fs.readFile('/etc/hosts', function(err, contents) {
//     console.log(contents);
// });
// console.log('Doing everything else');

///////////////////////////////////////////////////////////////////////////////

// // The following is an alternating syntax for non blocking code 
// var callback = function(err, contents) {
//     console.log(contents);
// }

// fs.readFile('/etc/hosts', callback);
// console.log('Doing everything else');

///////////////////////////////////////////////////////////////////////////////

// const http = require('http');
// http.createServer(function(request,response){
//     response.writeHead(200)
//     response.write("Hello, this is a dog")
//     response.end()
// }).listen(8080,function(){
//     console.log('listening on port 8080 ... ')
// })
// // $ curl http://localhost:8080 // ---> Hello, this is dog.


///////////////////////////////////////////////////////////////////////////////
// The Event Loop


///////////////////////////////////////////////////////////////////////////////
// Two callbacks here - request, timeout
var http = require('http');
http.createServer(function(request, response) {
    response.writeHead(200);
    response.write("Dog is running.");
    setTimeout(function(){ 
        response.write("Dog is done.");
        response.end();}, 5000);
    }).listen(8080);


///////////////////////////////////////////////////////////////////////////////