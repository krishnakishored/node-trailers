console.log('Start')

// setTimeout is a built-in function in Node.js that allows you to schedule a function to be executed after a specified amount of time has elapsed.
setTimeout(() => {
    console.log('2 seconds timer')
}, 2000)

setTimeout(() => { console.log('0 seconds timer') }, 0)

console.log('End')