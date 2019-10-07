//Events

// var EventEmitter = require('events').EventEmitter
// var logger = new EventEmitter()
// logger.on('error',function(message){
//     // listen for error event
//     console.log('ERR: '+ message)
// })

// logger.on('warn',function(message){
//     console.log('Warn: '+ message)
// })

// logger.on('info', (message)=>{
//     console.log('Info: ' + message)
// })

// logger.emit('error', 'Spilled Milk')
// logger.emit('warn', 'Eggs Cracked')
// logger.emit('info', 'Beans spilled')

///////////////////////////////////////////////////////////////////////////////

const http = require('http')
/*
 http.createServer([requestListener])
 The 'requestListener' is a function automatically added to the 'request' event
 http.Server is an 'EventEmitter' with following events: 'request'.... 
*/

// http.createServer(function(request,response){

// });

// alternate syntax
var server = http.createServer()
server.listen(8080)

server.on('request',function(request,response){
// console.log('request arrives')
    response.writeHead(200)
    response.write("Hello, this is a dog")
    response.end()
})
server.on('close',function(request,response){
    // console.log('server closes')
    response.writeHead(200)
    response.write("server closes")
    response.end()
}) // event - 'close' emitted when the server closes