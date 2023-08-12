const events = require('events');
const eventEmitter = events.EventEmitter;
const emitter = new eventEmitter()

emitter.on("newListener", function(eventName, listener) {
    console.log("Added listener for " + eventName + " events");
});

emitter.on('data_received', ()=> {
    console.log('data received succesfully');
});

emitter.on('data_received', ()=> {
    console.log('data received succesfully 2');
});

emitter.emit('data_received'); 

console.log(emitter.listenerCount(eventEmitter,"data_received"))




// var eventEmitter = events.EventEmitter;
// var emitter = new eventEmitter();
// emitter.on("newListener", function(eventName, listener) {
//     console.log("Added listener for " + eventName + " events");
// });
// emitter.on('data_received', function() {});
// emitter.on('data_received', function() {}); 