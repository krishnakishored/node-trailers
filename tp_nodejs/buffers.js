// var buf = new Buffer(10); // syntax to create an uninitiated Buffer of 10 octets −

// var buf = new Buffer([10,20,30.40,50]); // syntax to create a Buffer from a given array −

// var buf = new Buffer("Simply Easy Learning", "utf-8"); //create a Buffer from a given string and optionally encoding type



buf = new Buffer(256);
len = buf.write("Simply Easy Learning");
console.log("Octets written : "+  len);
len = buf.write("Simply Easy Learning Simply Easy Learning Simply Easy Learning Simply Easy Learning Simply Easy Learning Simply Easy Learning Simply Easy Learning Simply Easy Learning Simply Easy Learning Simply Easy Learning Simply Easy Learning Simply Easy Learning Simply Easy Learning Simply Easy Learning Simply Easy Learning Simply Easy Learning");
console.log("Octets written : "+  len);
//console.log(buf.toString());


buf_to_read = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
    buf_to_read[i] = i + 97;//writing first
}

console.log( buf_to_read.toString('ascii'));       // outputs: abcdefghijklmnopqrstuvwxyz
console.log( buf_to_read.toString('ascii',0,5));   // outputs: abcde
console.log( buf_to_read.toString('utf8',0,5));    // outputs: abcde
console.log( buf_to_read.toString(undefined,0,5)); // encoding defaults to 'utf8', outputs abcde

var buf_to_json = new Buffer('Simply Easy Learning');
var json = buf_to_json.toJSON(buf_to_json);
//console.log(json);

var buffer1 = new Buffer('quick brown fox ');
var buffer2 = new Buffer('lazy dog');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 content: " + buffer3.toString());

var buffer11 = new Buffer('ABC');
var buffer12 = new Buffer('ABCD');
var result = buffer11.compare(buffer12);

if(result < 0) {
   console.log(buffer11 +" comes before " + buffer12);
}else if(result == 0){
   console.log(buffer11 +" is same as " + buffer12);
}else {
   console.log(buffer11 +" comes after " + buffer12);
}

var buffer14 = new Buffer('ABC');
var buffer15 = new Buffer(3);//copy a buffer
buffer14.copy(buffer15);
console.log("buffer15 content: " + buffer15.toString());


var buffer16 = new Buffer('quickbrownfox');

//slicing a buffer
var buffer17 = buffer16.slice(0,10);
console.log("buffer17 content: " + buffer17.toString());

//length of the buffer
var buffer18 = new Buffer('lazydog');
console.log("buffer length: " + buffer18.length);
