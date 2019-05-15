const fs = require('fs')


// // Writing to a file
// const writeStream = fs.createWriteStream("output.txt")
// writeStream.write("The memoirs of an invisible man")
// writeStream.write("The life of Pi")

// // const readStream = fs.createReadStream("data.txt")
// const readStream = fs.createReadStream("output.txt")
// readStream.on('data',(data)=> {
//     let chunk = data.toString()
//     console.log(chunk)
// })

//Using Pipe
const readStream = fs.createReadStream('data.txt')
const writeStream = fs.createWriteStream('output.txt')
// readStream.pipe(writeStream)
readStream.pipe(process.stdout)
