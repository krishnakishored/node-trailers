const fs = require('fs');

// Schedule a callback function to be executed immediately after the current operation completes
setImmediate(() => console.log('setImmediate'));

// Read the contents of the /etc/passwd file asynchronously
fs.readFile('/etc/passwd', (err, data) => {
    console.log('reading file');
});

console.log('start');

// Schedule a callback function to be executed after the current operation completes but before any I/O operations are performed
process.nextTick(() => console.log('nextTick'));

// Schedule two setTimeout functions to be executed after a certain amount of time has elapsed
// The first setTimeout function is scheduled to execute immediately, while the second setTimeout function is scheduled to execute after 3 milliseconds
setTimeout(() => console.log('setTimeout 1'), 0);
setTimeout(() => console.log('setTimeout 2'), 3);

// Set up a setInterval function to be executed repeatedly at a specified interval
// The function logs a message to the console and increments a counter
// When the counter reaches a certain value, the function logs a message indicating that it is exiting and clears the interval
let counter = 0;
const timeout = setInterval(() => {
    console.log('setInterval');
    if (counter >= 3) {
        console.log('exiting setInterval');
        clearInterval(timeout);
    }
    counter++;
}, 0);

// Create a new Promise object and log a message indicating that it is starting
// The Promise object resolves immediately with a value of "Promise 1"
// The then() method is called on the Promise object, and the callback function logs the value that was passed to it
new Promise((resolve, reject) => {
    console.log('start promise 1');
    resolve('Promise 1');
}).then(data => {
    console.log(data);
})

console.log('end');