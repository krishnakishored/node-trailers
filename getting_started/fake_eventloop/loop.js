//node myFile.js
const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];



// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue(){
    // Check one: Any pending setTimeout, setInterval, setImmediate?
    // Check two: Any pending OS tasks? (Like server listening to port)   
    // Check three: Any pending long running operations? (Like fs module) 
    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

//entire body executes in one 'tick'
while(shouldContinue()){
// 1. Node looks at pendingTimers and sees if any functions are ready to be called
// 2. Node looks at pendingOSTasks, pendingOperations and calls relevant callbacks
// 3. Pause execution. Continue when .. 
     // - a new pendingOSTask is done
     // - a new pendingOperation is done
     // - a timer is about to complete
// 4. Look at pendingTimers. Call any setImmediate
// 5. Handle any 'close' events

}

//exit back to terminal

/*
 * In a Node program, the event loop is single threaded but the entirety of a Node program is not.
 * Some of the Node Framework/StdLib are not single threaded
 * 
 * 1. Can we use the threadpool for js code or can only nodejs functions use it?
 *   - we can write custom js that uses the thread pool
 * 2. What functions in node std lib use the threadpool?
 *   - All 'fs' module functions. Some crypto stuff. Depends on OS
 * 3. How does the threadpool stuff fit into the event loop?
 *   - Tasks running in the threadpool are the 'pendingOperations' in our code example 
 */

 /**
 *  1. What functions in node std lib use the OS's async features
 *   - Almost everything aroung networking lib for all OS's. Some other stuff is OS specific.
 *  2. How does this os async stuff fit into the event loop?
 *   - Tasks using the underlying OS are reflected in our 'pendingOSTasks' array
 */

/**
 *   node index.js 
 *  1. Process and execute code in index.js file
 *  2. Do we still have work to do? Look at timers, OS tasks, threadpool
 *     if NO - exit the progam, 
 *     if YES
 *  3. Run setTimeOut's, setInterval's     
 *  4. Run callbacks for any OS tasks or threadpool tasks that are done.
 *  5. Pause and wait for stuff to happen
 *  6. Run any 'setImmediate' functions
 *  7. Handle close events
 *     REPEAT
 * 
 * 
 * 
 * 
 * 
*/
       