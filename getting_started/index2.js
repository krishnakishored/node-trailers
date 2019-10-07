///////////////////////////////////////////////////////////////////////////////
/*
const index = require('./index.js')
console.log(index) // { answer: 42 }
*/
///////////////////////////////////////////////////////////////////////////////
/*
require('./index.js')
require('./index.js')
require('./index.js')
// In index.js // only once due to caching
*/

/*
// Invoked each time
require('./index.js')() //Hello
require('./index.js')() //Hello
require('./index.js')() //Hello
*/

///////////////////////////////////////////////////////////////////////////////
/*
require('./index.js').f1()
require('./index.js').f2()
require('./index.js').f3()
*/
///////////////////////////////////////////////////////////////////////////////




const test = ()=>{
    var temp2 = 2
    
    console.log(temp2)    
}

const test2 = ()=>{
    {
        let temp = 10
    }
   
    console.log(temp2)    
}

test2()