// An async function returns a promise, like in this example:
const doSomethingAsync = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve('I did something'), 3000)
    })
}

//----------------------------------------
/**
 * When you want to call this function you prepend 'await', 
 * and the calling code will stop until the promise is resolved or rejected. 
 * One caveat: the client function must be defined as `async`. Here’s an example:
*/

const doSomething = async() => {
    console.log(await doSomethingAsync())
}

console.log('Before')
doSomething()
console.log('After')

/**
 *  Before
    After
    I did something
 */

 //----------------------------------------

const aFunction = async () => {
    // return 'test
    return Promise.resolve('test')
}

aFunction().then(console.log('alert'))
// aFunction().then(alert)


//----------------------------------
// For example here’s how you would get a JSON resource, and parse it, using promises:
/*
const getFirstUserData = () => {
    return fetch('/users.json') // get users list
      .then(response => response.json()) // parse JSON
      .then(users => users[0]) // pick first user
      .then(user => fetch(`/users/${user.name}`)) // get user data
      .then(userResponse => userResponse.json()) // parse JSON
  }
  
  getFirstUserData()

*/  

// And here is the same functionality provided using await/async:
/*
const getFirstUserData = async () => {
    const response = await fetch('/users.json') // get users list
    const users = await response.json() // parse JSON
    const user = users[0] // pick first user
    const userResponse = await fetch(`/users/${user.name}`) // get user data
    const userData = await userResponse.json() // parse JSON
    return userData
  }
  
  getFirstUserData()

*/  


//------------------------------------------------------
const promiseToDoSomething = () => {
    return new Promise(resolve => {
      setTimeout(() => resolve('I did something'), 5000)
    })
  }
  
  const watchOverSomeoneDoingSomething = async () => {
    const something = await promiseToDoSomething()
    return something + ' and I watched'
  }
  
  const watchOverSomeoneWatchingSomeoneDoingSomething = async () => {
    const something = await watchOverSomeoneDoingSomething()
    return something + ' and I watched as well'
  }
  
  watchOverSomeoneWatchingSomeoneDoingSomething().then(res => {
    console.log(res)
  })  //I did something and I watched and I watched as well
