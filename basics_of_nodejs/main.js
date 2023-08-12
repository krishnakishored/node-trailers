console.log("Hello, world!")

var http = require("http");


// create a server instance and then we bind it at port 8081 using the listen method associated with the server instance.
http.createServer( function(request,response){
    // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
    response.writeHead(200,{'Content-Type':'text/plain'});
    // Send the response body as "Hello World"
    response.end('hello, node!');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081')

//Open http://127.0.0.1:8081/ in any browser and observe the following result.
//hello, node!

