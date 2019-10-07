///////////////////////////////////////////////////////////////////////////////
// const hello = require('./modules_custom_hello')
// const goodbye = require('./modules_custom_goodbye')
// const multi = require('./modules_multiple_fn')

// hello()
// goodbye.goodbye()

// multi.bar()
// multi.foo()
// // multi.baz()// can't be accessed

///////////////////////////////////////////////////////////////////////////////
// Making http requests

///////////////////////////////////////////////////////////////////////////////

var http = require('http');
http.createServer(function(request, response) {
    response.writeHead(200);
    response.write("Dog is running.");
    setTimeout(function(){ 
        response.write("Dog is done.");
        response.end();}, 5000);
    }).listen(8080);

var makeRequest = require('./modules_make_request')
makeRequest("Hello, this is dog")