
//initialize using a constructor  -  new Promise():
let done = true

/**
 * As you can see the promise checks the done global constant, 
 * and if that’s true, we return a resolved promise, otherwise a rejected promise.
 * Using resolve and reject we can communicate back a value, 
 * in this case we just return a string, but it could be an object as well.
 */
const isItDoneYet = new Promise((resolve,reject)=>{
 if(done){
     const workDone = 'Here is the thing I built'
     resolve(workDone)
 }
 else{
     const why = 'Still working on something else'
     reject(why)
 }
})

const checkIfItsDone = ()=>{
    isItDoneYet.then(ok =>{
        console.log(ok)
    })
    .catch(err =>{
        console.error(err)
    })
}

checkIfItsDone()

//-----------------------------------------------------------

const promiseOne = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'one')
  })

const promiseTwo = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'two')
  })
  
Promise.race([promiseOne, promiseTwo]).then(result => {
    console.log(result) // 'two'
  })