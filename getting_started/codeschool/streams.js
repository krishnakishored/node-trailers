// Streams
/*
 * In  http.createServer(function(request,response){}
    request - readable stream
    response - writeable stream 
 */

 ///////////////////////////////////////////////////////////////////////////////
// var http = require('http')
// http.createServer(function(request,response){
//     response.writeHead(200);
//     request.on('readable',function(){
//         var chunk = null
//         while(null !== (chunk = request.read())){
//             console.log(chunk.toString())
//         }
//     })
//     request.on('end', function(){
//         response.end()
//     })
// }).listen(8080)

//curl -d 'helo' http://localhost:8080
///////////////////////////////////////////////////////////////////////////////

// var http = require('http')
// http.createServer(function(request,response){
//     response.writeHead(200)
//     request.pipe(response)
// }).listen(8080)

///////////////////////////////////////////////////////////////////////////////
// Reading & Writing a File
// var fs = require('fs')
// var file = fs.createReadStream('../js_notes.md')
// var new_file = fs.createWriteStream("../readMe_copy.md")

// file.pipe(new_file)
///////////////////////////////////////////////////////////////////////////////
// Upload a file -  
// $ curl --upload-file ../js_notes.md http://localhost:8080

// var fs = require('fs')
// var http = require('http')

// http.createServer(function(request,response){
//     var new_file = fs.createWriteStream("../readMe_copy.md")
//     request.pipe(new_file)

//     request.on('end',function(){
//         response.end('uploaded!')
//     })
// }).listen(8080)

///////////////////////////////////////////////////////////////////////////////
//Showing Progress
var http = require('http')
var fs = require('fs')

http.createServer(function(request, response) {
    var newFile = fs.createWriteStream("../readMe_copy.md");
      var fileBytes = request.headers['content-length'];
      var uploadedBytes = 0;
      request.on('readable', function() {
        var chunk = null;
         while(null !== (chunk = request.read())){
           uploadedBytes += chunk.length;
           var progress = (uploadedBytes / fileBytes) * 100;
           response.write("progress: " + parseInt(progress, 10) + "%\n");
        }
    });
      request.pipe(newFile);
      request.on('end',function(){
        response.end('uploaded!')
      })
    }).listen(8080);

///////////////////////////////////////////////////////////////////////////////