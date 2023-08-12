// Although events look quite similar to callbacks, the difference lies in the fact that callback functions are called when an asynchronous function returns its result,
// whereas event handling works on the observer pattern. The functions that listen to events act as Observers. 
// Whenever an event gets fired, its listener function starts executing. 
// Node.js has multiple in-built events available through events module and EventEmitter class which are used to bind events and event-listeners


// Import events module
var events = require('events');

// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();

// Create an event handler as follows
var connectHandler = function(){
    console.log('connection succesful');
   // Fire the data_received event 
   eventEmitter.emit('data_received');
}

//Bind the connection event with handler
eventEmitter.on('connection',connectHandler);

//Bind the data_received event with the anonymous function
eventEmitter.on('data_received',function(){
    console.log('data received successfully');
});

//Fire the connection event
eventEmitter.emit('connection');

console.log('end of program');

