// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req,res)=>{
//     // readFile() reads the full contents of the file, and invokes the callback function when it’s done.
//     fs.readFile(__dirname+'/data.txt',(err,data)=>{
//         //res.end(data) in the callback will return the file contents to the HTTP client.
//         res.end(data)
//     })
// })


//If the file is big, the operation will take quite a bit of time. 
// Here is the same thing written using streams:

// const server = http.createServer((req, res) => {
//     const stream = fs.createReadStream(__dirname + '/data.txt')
// // Instead of waiting until the file is fully read, 
// // we start streaming it to the HTTP client as soon as we have a chunk of data ready to be sent.
//     stream.pipe(res)
// })
  


// server.listen(3000) 

// ############################################################################
// Types of streams

// //Readable stream
// const Stream = require('stream')
// const readableStream = new Stream.Readable()
// readableStream.push('hi!')
// readableStream.push('ho!')

// ############################################################################

// //Writable stream
// const Stream = require('stream')
// const writableStream = new Stream.Writable()
// writableStream._write = (chunk, encoding, next) => {
//     console.log(chunk.toString())
//     next()
// }

// process.stdin.pipe(writableStream)
// ############################################################################

// //How to get data from a readable stream
// const Stream = require('stream')

// const readableStream = new Stream.Readable()
// const writableStream = new Stream.Writable()

// writableStream._write = (chunk, encoding, next) => {
//     console.log(chunk.toString())
//     next()
// }

// readableStream.pipe(writableStream)

// readableStream.push('hi!')
// readableStream.push('ho!')

// //using an readable event
// // readableStream.on('readable', () => {
// //     console.log(readableStream.read())
// // })

// ############################################################################

// //How to send data to a writable stream
// const Stream = require('stream')
// const writableStream = new Stream.Writable()
// writableStream.write('hey!\n')

// ############################################################################
//Signaling a writable stream that you ended writing

// const Stream = require('stream')

// const readableStream = new Stream.Readable()
// const writableStream = new Stream.Writable()

// writableStream._write = (chunk, encoding, next) => {
//     console.log(chunk.toString())
//     next()
// }

// readableStream.pipe(writableStream)

// readableStream.push('hi!')
// readableStream.push('ho!')

// writableStream.end()