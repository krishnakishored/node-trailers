//Blocking code - executes very much in sequence
var fs = require('fs');
var data = fs.readFileSync('input.txt')
console.log(data.toString());
console.log('End of blocking program')

//Non-blocking code - async function
fs.readFile('input.txt',function(err,data){
    if(err) return console.error(err);
    console.log(data.toString());
});
// If an error occurs during the read operation, then the err object will contain the corresponding error,
// else data will contain the contents of the file. 
// readFile passes err and data to the callback function after the read operation is complete, which finally prints the content.

console.log('End of non-blocking program')