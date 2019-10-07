/*


process.stdout.write(Math.random().toString())
console.log(" " +Math.random())
console.dir(process,{depth:0})


*/

///////////////////////////////////////////////////////////////////////////////
/*
function X(){
    console.log(arguments)
}
X(10,20,30)

// function(exports,require,module,exports,__filename,__dirname){ // IIFE - Immediately invoked function
     console.log(arguments)
    //  return module.exports
// }


exports.answer = 42 // exports is globally available object. Also it's an alias to 'module.exports'
module.exports.answer = 44
console.log(exports) // { answer: 44 }
*/
///////////////////////////////////////////////////////////////////////////////
/*
console.log('In index.js')
exports.answer = 42 // will be used in index2.js
*/

/*
// to avoid caching
module.exports = ()=>{
    console.log('Hello')
}
*/

///////////////////////////////////////////////////////////////////////////////
/*
module.exports = {
    f1 : ()=>{
        console.log("f1")
    },

    f2 : ()=>{
        console.log("f2")        
    },

    f3 : ()=>{
        console.log("f3")
    }
}
*/

///////////////////////////////////////////////////////////////////////////////