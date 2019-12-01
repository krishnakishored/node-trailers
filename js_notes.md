## JS quick reference
----
### NodeJs 
* Allows you to build scalable network applications using JavaScript on the server-side
* V8 JavaScript Runtime
* What could you build :
    - Websocket Server
    - Fast File Upload Client
    - Ad Server
    - Any Real-Time Data Apps
* NodeJs is not a Web Framework
* JavaScript has certain characteristics that make it very different than other dynamic languages, namely that it has no concept of threads. Its model of concurrency is completely based around events.”

* Similar to how DOM triggers events(click, submit, hover) & we can listen for those events, Many Objects in node emit events - net.Server(EventEmitter) emits request, fs.readStream emits data

* exports defines what require returns

* Global npm modules can’t be required
* follow Semantic Versioning. http://semver.org  - (Major).(Minor).(Patch)
* Express is Sinatra(ruby) inspired web development framework for Nodejs
    - Easy route URLs to callbacks
    - Middleware (from Connect)
    - Envrironment based configuration
    - Redirection helpers
    - File Uploads
----
### Advanced nodejs
1. `process.binding`() - Connects JS and C++ functions. e.g pbkdf2(lib/)--> PBKDF2(src/node_crypto.cc)
1. `V8` - Converts values between JS and C++ world
1. `libuv` - gives node easy access to underlying OS
    - Uses Thread Pool(of 4 threads) to execute computation intensive tasks
    - `process.env.UV_THREADPOOL_SIZE` = 2 
    - Functions in node std library that use the threadpool - All 'fs' modules functions.Some crypto. OS dependent
    - Tasks running on threadpool are the 'pendingOperations' in our example
1. Process - instance of a running program. Process have multiple threads
   OS Scheduler - decides which thread should be processed
1. Node Event Loop - a control structure that decides what our one thread should be doing at any given point of time
    - Node Event Loop is single threaded. 
    - But some of Node Framework/Std Lib are not single threaded. e.g. run twice - crypto.pbkdf2(..)
    ~~~js
    // node myFile.js

    const pendingTimers = [];
    const pendingOSTasks = [];
    const pendingOperations = [];


    myFile.runContents();

    function shouldContinue(){
        //Check One - Any pending setTimeout, setInterval, setImmediate ? 
        //Check Two - Any pending OS tasks? (Like server listening to port)
        //Check Three - Any pending long running operations ? (like fs modules)
        return pendingTimers.length || pendingOSTasks.length || pendingOperations.length
    }


    //Entirebody executes in one 'tick'
    while(shouldContinue()){
        // 1. Node looks at pendingTimers and sees if any functions are ready to be called, setTimeout, setInterval
        // 2. Node looks at pendingOSTasks and pendingOperations(threadPool tasks) and then call relevant callbacks
        // 3. Pause execution. Continue when.. 
        //    - a new pendingOSTask is done
        //    - a new pendingOperation is done
        //    - a timer is about to complete
        // 4. Node looks at pendingTimers and call any setImmediate
        // 5. Handle any 'close' events - (cleanup code)
    }
    //exit back to terminal
    ~~~




### Getting Started with nodejs
1. node can be used with v8 (managed by google), chakra, spidermonkey
1. Browser, DOM  api vs Node api (v8)
1. Single threaded environment - but support async api
1. REPL vs script execution mode
1. WeakMap,Reflectm zlib, .. 
1. IIFE - immediately invoked function expression `>require('module').wrapper`
1. `export` alias module.exports - global mutable object
1. node vs v8 apis
1. `import` - `export` replaces `require`
1. package.json 
    "scripts":{}
    "start": "node -r esm server.js"  ---> $ npm start
    "prod_start": "NODE_ENV=production node -r esm server.js"  ---> npm run prod_start ---> yarn prod_start

1. npx - npm execute
    - install something and use it globally

1. http
    ~~~js
    import http from 'http'
    const server = http.createserver()
    server.on('request',(req,res)=>{
        console.log("request", req.url)
        req.write('Hello HTTP') // hits twice from browser// for / & /favicon.png
    })
    server.listen(8080)

    ~~~
1. express
    - wrapper around http
    ~~~js
    server = express()
    server.get('/',()=>{
        res.send()
        res.sendFile()
    })
    ~~~
1. import - statically evaluated
   requore - dynamically evaluated
   import() - gives back promise

1. callbacks
~~~js
    import {exec} from `child_process`
    exec('ls /', ()=>{})

    //using promise
    const main = async()=> {
        const stdout = await exec ('ls /')
    }

    // `promisify` promise is resolved or rejected
    import utils from 'utils'
    ...
    const execP = utils.promisify(exec)
~~~

#### Sample commands
~~~js
$ node -p "Math.random()" 
$ node --v8-options
$ node -p process // interface to the os
$ node -p process.env // all the environment variables
$ node -p "require('module').wrapper" // [ '(function (exports, require, module, __filename, __dirname) { ','\n});' ]
$ nvm use system
$ node --inspect-br 
// NODE_DEBUG, NODE_PATH
export default {} ----> module.export
import m1 form './m1.js' ---> require('./m1')
console.log(http.STATUS_CODES)
$ npm i esm 
$ node -r esm m1.js (request a module before execution)
$ npm i lodash // ---> creates folder in node_modules
$ npm publish  //---->  for publish to npm registry
$ npm i expressjs/express // ---> installs from github 
$ npm i -g eslint // ---> global installed
$ npm i -D eslint // ---> installs under devdependencies
$ npm uninstall lodash //---> remove from node_modules
$ npm i -D nodemon

~~~    


----
### JavaScript Closures
When a function is run, it’s `executed with the scope that was in place when it was defined`, and *__not__ with the state that’s in place when it is executed*.
- The scope basically is the set of variables which are visible.
- A function remembers its Lexical Scope, and it’s able to access variables that were defined in the parent scope.
- The function that’s returned keeps the original state in its scope.


---- 

### Promises
A promise is commonly defined as a `proxy for a value that will eventually become available`
Promises are one way to deal with asynchronous code, without writing too many callbacks in your code. Now they have been superseded in ES2017 by async functions.

 - how promises work?
    Once a promise has been called, it will start in pending state. This means that the caller function continues the execution, while it waits for the promise to do its own processing, and give the caller function some feedback.

    At this point, the caller function waits for it to either return the promise in a resolved state, or in a rejected state, but the function continues its execution while the promise does it work.

- chaining promises
    The Fetch API is a promise-based mechanism, and calling fetch() is equivalent to defining our own promise using new Promise().

- Promise.all()
    If you need to synchronize different promises, `Promise.all()` helps you define a list of promises, and execute something when they are all resolved.

~~~javascript
const f1 = fetch('/something.json')
const f2 = fetch('/something2.json')

Promise.all([f1, f2])
.then(res => {
    console.log('Array of results', res)
})
.catch(err => {
    console.error(err)
})
~~~


- Promise.race()
    Promise.race() runs as soon as one of the promises you pass to it resolves, and it runs the attached callback just once with the result of the first promise resolved.

----
### Async and Await
JavaScript evolved in a very short time from callbacks to promises (ES2015), and since ES2017 asynchronous JavaScript is even simpler with the async/await syntax.

* Async functions are `a combination of promises and generators`, and basically, they are a higher level abstraction over promises. Let me repeat: `async/await is built on promises`.

* An async function returns a promise
* `Prepending the async keyword to any function means that the function will return a promise`. Even if it’s not doing so explicitly, it will internally make it return a promise.
----

### Streams
* Node makes extensive use of streams as a data transfer mechanism.
* Streams are a way to handle reading/writing files, network communications, or any kind of end-to-end information exchange in an efficient way.

* Streams are not a concept unique to Node.js. They were introduced in the Unix operating system decades ago, and programs can interact with each other passing streams through the pipe operator (|).

* For example, in the traditional way, when you tell the program to read a file, the file is read into memory, from start to finish, and then you process it. Using streams you read it piece by piece, processing its content without keeping it all in memory.

* Due to their advantages, many Node.js core modules provide native stream handling capabilities, most notably:
`process.stdin` returns a stream connected to stdin     
`process.stdout` returns a stream connected to stdout       
`process.stderr` returns a stream connected to stderr     
`fs.createReadStream()` creates a readable stream to a file       
`fs.createWriteStream()` creates a writable stream to a file      
`net.connect()` initiates a stream-based connection       
`http.request()` returns an instance of the http.ClientRequest class, which is a writable stream      
`zlib.createGzip()` compress data using gzip (a compression algorithm) into a stream      
`zlib.createGunzip()` decompress a gzip stream.       
`zlib.createDeflate()` compress data using deflate (a compression algorithm) into a stream    
`zlib.createInflate()` decompress a deflate stream        

* Different types of streams      
There are four classes of streams:

`Readable`: a stream you can pipe from, but not pipe into (you can receive data, but not send data to it). When you push data into a readable stream, it is buffered, until a consumer starts to read the data.
> A readable stream is an abstraction for a source from which data can be consumed. An example of that is the fs.createReadStream method.

`Writable`: a stream you can pipe into, but not pipe from (you can send data, but not receive from it)
> A writable stream is an abstraction for a destination to which data can be written. An example of that is the fs.createWriteStream method.

`Duplex`: a stream you can both pipe into and pipe from, basically a combination of a Readable and Writable stream
> A duplex streams is both Readable and Writable. An example of that is a TCP socket.

`Transform`: a Transform stream is similar to a Duplex, but the output is a transform of its input
> A transform stream is basically a duplex stream that can be used to modify or transform the data as it is written and read. An example of that is the zlib.createGzip stream to compress the data using gzip. You can think of a transform stream as a function where the input is the writable stream part and the output is readable stream part. You might also hear transform streams referred to as “through streams.”

`All streams are instances of EventEmitter`. They emit events that can be used to read and write data. However, we can consume streams data in a simpler way using the pipe method.

* `stream.pipe(res)`: the pipe() method is called on the file stream.  It takes the source, and pipes it into a destination. `readableSrc.pipe(writableDest)`         
The pipe method is the easiest way to consume streams.   
~~~js
    readableSrc  
        .pipe(transformStream1)  
        .pipe(transformStream2)  
        .pipe(finalWrtitableDest)  
~~~

You call it on the source stream, so in this case, the file stream is piped to the HTTP response. The return value of the pipe() method is the destination stream, which is a very convenient thing that lets us chain multiple pipe() calls:`$ src.pipe(dest1).pipe(dest2)` which is same as:
`$ src.pipe(dest1)`
`$ dest1.pipe(dest2)`

~~~js
//readable.pipe(writable)

readable.on('data', (chunk) => {
  writable.write(chunk);
});
readable.on('end', () => {
  writable.end();
});
~~~

The most important events on a readable stream are:
The `data` event, which is emitted whenever the stream passes a chunk of data to the consumer.  The `end` event, which is emitted when there is no more data to be consumed from the stream.

The most important events on a writable stream are:
The `drain` event, which is a signal that the writable stream can receive more data.
The `finish` event, which is emitted when all data has been flushed to the underlying system.





----
### Classes
Traditionally JavaScript is the only mainstream language with prototype-based inheritance. 
- Classes have a special method called `constructor` which is called when a class is initialized via `new`. The parent class can be referenced using `super`().



    ~~~javascript
    class Person {
    constructor(name) {
        this.name = name
    }
    hello() {
        return 'Hello, I am ' + this.name + '.'
     }
    }
    //----------------------
    class Actor extends Person {
    hello() {
        return super.hello() + ' I am an actor.'
     }
    }

    var tomCruise = new Actor('Tom Cruise')
    tomCruise.hello()
    ~~~
----
### Modules 
Importing is done via the `import ... from ...` construct:

~~~js
import * from 'mymodule'
import React from 'react'
import { React, Component } from 'react'
import React as MyLibrary from 'react'
~~~

You can write modules and export anything to other modules using the `export` keyword

~~~js
export var foo = 2
export function bar() { /* ... */ }
~~~
----
### Generators
Generators are a special kind of function with the ability to pause itself, and resume later, allowing other code to run in the meantime.

- The code decides that it has to wait, so it lets other code “in the queue” to run, and keeps the right to resume its operations “when the thing it’s waiting for” is done.
- All this is done with a single, simple keyword: `yield`. When a generator contains that keyword, the execution is halted.
- A generator can contain many yield keywords, thus halting itself multiple times, and it’s identified by the `*function`

----
### let and const
- `var` is traditionally function scoped.
- `let` is a new variable declaration which is block scoped.
    This means that declaring let variables in a for loop, inside an if or in a plain block is not going to let that variable “escape” the block, while vars are hoisted up to the function definition.

- `const` is just like let, but immutable.

----
### Template Literals
- Template literals are a new syntax to create strings.
- They provide a way to embed expressions into strings, effectively inserting the values, by using the `${a_variable}` syntax. Strings can span over multiple lines

~~~js
const aString = `A string`

const joe = 'test'
const string = `something ${joe}` //something test

const string2 = `something ${foo() ? 'x' : 'y' }`

const string3 = `Hey
this

string
is awesome!`
~~~
- A prototype can be specified with 
~~~js
const anObject = { y: 'y' }
const x = {
  __proto__: anObject
}
~~~

- super()
~~~js
const anObject = { y: 'y', test: () => 'zoo' }
const x = {
  __proto__: anObject,
  test() {
    return super.test() + 'x'
  }
}
x.test() //zoox
~~~
----
### The spread operator
You can expand an array, an object or a string using the spread operator `...`
- Using strings, the spread operator creates an array with each char in the string:
-  The most important one is the ability to use an array as function argument in a very simple way:

~~~js
const a = [1, 2, 3]
const b = [...a, 4, 5, 6] //new array
const c = [...a] //copy of an array
const newObj = { ...oldObj } // clone an object

// Using strings, the spread operator creates an array with each char in the string:
const hey = 'hey'
const arrayized = [...hey] // ['h', 'e', 'y']

//  The most important one is the ability to use an array as function argument in a very simple way:

const f = (foo, bar) => {}
const a = [1, 2]
f(...a)
~~~

----
### Destructuring assignments
Given an object, you can extract just some values and put them into named variables:

~~~js

const person = {
  firstName: 'Tom',
  lastName: 'Cruise',
  actor: true,
  age: 54, //made up
}
const {firstName: name, age} = person

const a = [1,2,3,4,5]
const [first, second] = a

//This statement creates 3 new variables by getting the items with index 0, 1, 4 from the array a:
const [first, second, , , fifth] = a
~~~

-----


### Map datastructure
ECMAScript 6 (also called ES2015) introduced the `Map` data structure to the JavaScript world, along with `Set`. Before its introduction, people generally used objects as maps, by associating some object or value to a specific key value:

A WeakMap is a special kind of map.

In a map object, items are never garbage collected. A WeakMap instead lets all its items be freely garbage collected. Every key of a WeakMap is an object. When the reference to this object is lost, the value can be garbage collected.

Here are the main differences:
    - you cannot iterate over the keys or values (or key-values) of a WeakMap   
    - you cannot clear all items from a WeakMap     
    - you cannot check its size     

### Set datastructure
A Set data structure allows to add data to a container, a collection of objects or primitive types (strings, numbers or booleans), and you can think of it as a Map where values are used as map keys, with the map value always being a boolean true.

A WeakSet is a special kind of Set.

In a Set, items are never garbage collected. A WeakSet instead lets all its items be freely garbage collected. Every key of a WeakSet is an object. When the reference to this object is lost, the value can be garbage collected.


### Arrays

* Use New Syntax
> const a = []
    const a = [1, 2, 3]
    const a = Array.of(1, 2, 3)
    const a = Array(6).fill(1) //init an array of 6 items of value 1

Don’t use the old syntax (just use it for typed arrays)
const a = new Array() //never use
const a = new Array(1, 2, 3) //never use

`const l = a.length` //get length

* Iterating the array
`a.every(f)` - Iterates a until f() returns false
`a.some(f)` - Iterates a until f() returns true
`const b = a.map(f)` - Iterates a and builds a new array with the result of executing f() on each a element
`const b = a.filter(f)` - Iterates a and builds a new array with elements of a that returned true when executing f() on each a element

`a.reduce((accumulator, currentValue, currentIndex, array) => {//...}, initialValue)` - executes a callback function on all the items of the array and allows to progressively compute a result. If initialValue is specified, accumulator in the first iteration will equal to that value.

`a.forEach(f)` - Iterates f on a without a way to stop

`for (let v of a) {console.log(v)}` - for..of

`for (let i = 0; i < a.length; i += 1) { a[i]}` - Iterates a, can be stopped using return or break and an iteration can be skipped using continue


* iterator
Getting the iterator from an array returns an iterator of values
~~~js
    const a = [1, 2, 3]
    let it = a[Symbol.iterator]()
    console.log(it.next().value) //1
    console.log(it.next().value) //2
~~~
`.entries()` returns an iterator of key/value pairs

~~~js
    let it = a.entries()
    console.log(it.next().value) //[0, 1]
    console.log(it.next().value) //[1, 2]
    console.log(it.next().value) //[2, 3]
~~~

`.keys()` allows to iterate on the keys:
~~~js
let it = a.keys()

console.log(it.next().value) //0
console.log(it.next().value) //1
console.log(it.next().value) //2
~~~

.next() returns undefined when the array ends. You can also detect if the iteration ended by looking at it.next() which returns a value, done pair. done is always false until the last element, which returns true.


* Adding/Removing to an array
add 
- at the end - `a.push(4)`
- at the beginning - `a.unshift(0)` , `a.unshift(-2, -1)`

remove
- from the end - `a.pop()`
- from beginning - `a.shift()`
- at a random position - 
    `a.splice(0, 2)` // get the first 2 items
    `a.splice(3, 2) `// get the  2 items starting from index 3

Do not use `remove()` as it leaves behind `undefined` values.

remove and insert in place 
`a.splice(2, 3, 2, 'a', 'b')` 
// removes 3 items starting from index 2, and adds 2 items, 
// still starting from index 2

* Join multiple arrays
~~~js
const a = [1, 2]
const b = [3, 4]
a.concat(b) // 1, 2, 3, 4
~~~

* Lookup the array for a specific element
`a.indexOf()` - Returns the index of the first matching item found, or -1 if not found 

`a.lastIndexOf()` - Returns the index of the last matching item found, or -1 if not found

Returns the first item that returns true. Returns undefined if not found.
~~~js
a.find((element, index, array) => {
  //return true or false
})

a.find(x => x.id === my_id) //returns the first element in the array that has id === my_id.

~~~

findIndex returns the index of the first item that returns true, and if not found, it returns undefined:
~~~js
a.findIndex((element, index, array) => {
  //return true or false
})
~~~


`a.includes(value)` - Returns true if a contains value.

`a.includes(value, i)` - Returns true if a contains value after the position i.

`a.slice()` - Get a portion of array

* Sort the array

Sort alphabetically (by ASCII value - 0-9A-Za-z)
~~~js
const a = [1, 2, 3, 10, 11]
a.sort() //1, 10, 11, 2, 3

const b = [1, 'a', 'Z', 3, 2, 11]
b = b.sort() //1, 11, 2, 3, Z, a
~~~

Sort by a custom function
~~~js
const a = [1, 10, 3, 2, 11]
a.sort((a, b) => a - b) //1, 2, 3, 10, 11
~~~

`a.reverse()` - reverse the order of an array

* Get string representation
`a.toString()` - Returns a string representation of an array
`a.join()` - Returns a string concatenation of the array elements. Pass a parameter to add a custom separator:

* Copy an existing array by value
`const b = Array.from(a)`
`const b = Array.of(...a)`

* Copy just some values from an existing array
`const b = Array.from(a, x => x % 2 == 0)` 

* Copy portions of an array into the array itself, in other positions
~~~js
const a = [1, 2, 3, 4]
a.copyWithin(0, 2) // [3, 4, 3, 4]
const b = [1, 2, 3, 4, 5]
b.copyWithin(0, 2) // [3, 4, 5, 4, 5]
//0 is where to start copying into,
// 2 is where to start copying from
const c = [1, 2, 3, 4, 5]
c.copyWithin(0, 2, 4) // [3, 4, 3, 4, 5]
//4  is an end index
~~~

### Array Functions - map, filter, reduce, find
`map` returns an array with the same length,        
    - _Execute something on every element with map_       

`filter` as the name implies, it returns an array with less items than the original array
`reduce` returns a single value (or object)
`find` returns the first items in an array that satisfies a condition
    - _`filter()` and `reduce()` will iterate over all the array items, while `find()` will be faster_

-----
### The Node.js Event Loop
It explains how Node can be asynchronous and have non-blocking I/O
The Node.js JavaScript code runs on a single thread. There is just one thing happening at a time

- The environment manages multiple concurrent event loops, to handle API calls for example. 
  Web Workers run in their own event loop as well.
- Almost all the I/O primitives in JavaScript are non-blocking. Network requests, filesystem operations, and so on. Being blocking is the exception, and this is why JavaScript is based so much on callbacks, and more recently on promises and async/await.
- The event loop continuously checks the call stack to see if there’s any function that needs to run. While doing so, it adds any function call it finds to the call stack and executes each one in order.

- How to defer a function until the stack is clear
The use case of `setTimeout(() => {}), 0)` is to call a function, but execute it once every other function in the code has executed. passing '0' as timer instructs the setTimeout() to run immediately

- The Message Queue
    When setTimeout() is called, the Browser or Node.js start the timer. Once the timer expires, in this case immediately as we put 0 as the timeout, the callback function is put in the Message Queue.

    The Message Queue is also where user-initiated events like click or keyboard events, or fetch responses are queued before your code has the opportunity to react to them. Or also DOM events like onLoad.

    __The loop gives priority to the call stack, and it first processes everything it finds in the call stack, and once there’s nothing in there, it goes to pick up things in the message queue.__

    We don’t have to wait for functions like setTimeout, fetch or other things to do their own work, because they are provided by the browser, and they live on their own threads. For example, if you set the setTimeout timeout to 2 seconds, you don’t have to wait 2 seconds - the wait happens elsewhere.


- ES6 Job Queue

    ECMAScript 2015 introduced the concept of the Job Queue, which is used by Promises (also introduced in ES6/ES2015). It’s a way to execute the result of an async function as soon as possible, rather than being put at the end of the call stack.

    Promises that resolve before the current function ends will be executed right after the current function.

    That’s a big difference between Promises (and Async/await, which is built on promises) and plain old asynchronous functions through setTimeout() or other platform APIs.

-----
### ExpressJS

Express is a node.js Web Framework
* When you listen for connections on a route in express, the callback function will be invoked on every network call with a Request object instance and a Response object instance

-----

### CURL

sample curl commands 
* GET 
`curl "10.10.15.12:3000/?name=king&age=20"`   
`curl "10.10.15.12:3000/time"` 

* POST a json 
`$ curl -X POST -H "Content-Type: application/json" -d @FILENAME DESTINATION`       
`$ curl -X POST -H "Content-Type: application/json" -d '{"name":"abcd"}' 10.10.15.12:3000/form `  

-----

### Oclif
oclif is a framework for building CLIs in Node.  
With oclif you can create 2 different CLI types: single and multi.  
* Single CLIs are like ls or curl. They can accept arguments and flags. Single CLIs can optionally be just a single file.       
`$ npm install -g oclif`        
`$ npm update -g oclif` (to get the newer releases of the generator)        
* Multi CLIs are like git or heroku. They have subcommands that are themselves single CLIs. In the package.json there is a field oclif.commands that points to a directory. Multi-command CLIs may also include plugins.        
`$ npx oclif multi mynewmulticli`

* The Oclif CLI, has two possible ways to generate CLI projects, one is `npx oclif single mynewcli` and the second one is `npx oclif multi mynewcli`        
     
        npx is included in npm and automatically runs and installs the oclif generator.         
        To run `$ mynewcli` instead of `$ ./bin/run` you'll need to link your CLI locally using `$ npm link`


* Generator Commands
    - `$ oclif command NAME` add a command to an existing CLI or plugin     
    - `$ oclif help [COMMAND]`
    - `$ oclif hook NAME`
    - `$ oclif multi [PATH]`
    - `$ oclif single [PATH]`

* Command Development
To create a new command 'goodbye'
    - Run the command generator with `$ npx oclif command goodbye`      
    - duplicate `./src/commands/hello.ts` as `./src/commands/goodbye.ts` & update the code.     
    
- Command Flags
    Flag options are non-positional arguments passed to the command. Flags can either be option flags which take an argument, or boolean flags which do not. An option flag must have an argument.

- Command Arguments
    Arguments are positional arguments passed to the command.
    For variable length arguments, disable argument validation with static strict = false on the command.

- Topics
    As Multi CLIs grow it can be useful to nest commands within topics. This is supported simply by placing command files in subdirectories.

- Hooks
    You can create hooks with `$ oclif hook myhook --event=init`
    
    oclif exposes lifecycle event hooks such as `init` and `command_not_found`. In addition to these built-in events, you can create your own events and allow commands/plugins to watch for these custom events. It's a great way to allow multiple plugins to interact with each other.

    The hook must also be declared with the event's name and hook's file path under oclif's settings in package.json.

    Multiple hooks of the same event type can be declared with an array.

- Plugins
    Allow users to extend your CLI, break up a CLI into modular components, or share functionality between CLIs.
    Plugins can have commands or hooks just like a CLI.

- Tests
    ToDo    

- Running Commands Programmatically

- Aliases 
    Aliases let you define a string that maps to a command. 

- Custom Base Class
    Use inheritance to share functionality between common commands
    Example: A command base class that has some common shared flags and a log method that can be shared among many commands.


- Related Repositories
    `@oclif/command` - Base command for oclif. This can be used directly without the generator.
    `@oclif/config` - Most of the core setup for oclif lives here.
    `@oclif/errors` - Renders and logs errors from commands.
    `@oclif/cli-ux` - Library for common CLI UI utilities.
    `@oclif/test` - Test helper for oclif.    
-----

## CSV
<!-- https://csv.js.org -->
There are multiple APIs available. Under the hood, they are all based on the same implementation. The `stream API` might not be the most pleasant API to use but is scalable. Use the callback style API or the sync API for simplicity, readability and convenience if you are sure that your datasets fit in memory.

* csv-generate
    - Run `npm install csv` to install the full csv module or run `npm install csv-generate` if you are only interested by the CSV generator.

    - This package provides a flexible generator of CSV strings and Javascript objects implementing the Node.js stream.Readable API. It may be used to generate random or user-defined datasets.

    - Stream API : The main module of this package implements the native Node.js readable stream API. This is the recommended approach if you need a maximum of power. It ensures scalability by treating your data as an input stream. It is however more verbose and harder to use.
    The signature is `const stream = generate([options])`
    
    - Callback API
    The generated output is passed to the callback in the second argument. This mode implies that the overall dataset will be stored in memory.
    The signature is `const stream = generate([options], callback)`.

    - Sync API
    The generated output is returned. Like with the callback API, this mode implies that the overall dataset will be stored in memory.

    The module to require is csv-transform/lib/sync and the signature is `const records = generate([options])`.

* csv-parse   
-----
#### A Node.js application consists of the following three important components −

* Import required modules − We use the 'require' directive to load Node.js modules.

* Create server − A server which will listen to client's requests similar to Apache HTTP Server.

* Read request and return response − The server created in an earlier step will read the HTTP request made by the client which can be a browser or a console and return the response.

#### REPL stands for Read Eval Print Loop 

#### Attributes of Package.json
    name − name of the package
    version − version of the package
    description − description of the package
    homepage − homepage of the package
    author − author of the package
    contributors − name of the contributors to the package
    dependencies − list of dependencies. NPM automatically installs all the dependencies mentioned here in the node_module folder of the package.
    repository − repository type and URL of the package
    main − entry point of the package
    keywords − keywords


`Uninstalling a Module`
$ npm uninstall express
Once NPM uninstalls the package, you can verify it by looking at the content of /node_modules/ directory or type the following command − $ npm ls

`Updating a Module`
Update package.json and change the version of the dependency to be updated and run the following command.
$ npm update express

`Search a Module`
Search a package name using NPM.
$ npm search express

`Create a Module`
$  npm init

`Register yourself with NPM repository site using a valid email address`
$  npm adduser 

`Publish`
$ npm publish

* Callback is an asynchronous equivalent for a function.


#### Event-driven programming - 
* Every API of Node.js is asynchronous and being single-threaded, they use async    function calls to maintain concurrency. 
* Node uses observer pattern. Node thread keeps an event loop and whenever a task gets completed, it fires the corresponding event which signals the event-listener function to execute.

* In an event-driven application, there is generally a main loop that listens for events, and then triggers a callback function when one of those events is detected.

* Import events module
  `var events = require('events');`

* create an eventEmitter object
  `var eventEmitter = new events.EventEmitter();`

* Bind event and event  handler as follows
  `eventEmitter.on('eventName',eventHandler);`

* Fire an event
  `eventEmitter.emit('eventName');`

* In Node Application, any async function accepts a callback as the last parameter and a callback function accepts an error as the first parameter. 

* All objects which emit events are the instances of events.EventEmitter.

#### EventEmitter Class
* EventEmitter class lies in the events module.
* When an EventEmitter instance faces any error, it emits an 'error' event. When a new listener is added, 'newListener' event is fired and when a listener is removed, 'removeListener' event is fired.

`Methods`
1. addListener(event, listener)
Adds a listener at the end of the listeners array for the specified event. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of event and listener will result in the listener being added multiple times. Returns emitter, so calls can be chained.

2. on(event, listener)
Adds a listener at the end of the listeners array for the specified event. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of event and listener will result in the listener being added multiple times. Returns emitter, so calls can be chained.

3. once(event, listener)
Adds a one time listener to the event. This listener is invoked only the next time the event is fired, after which it is removed. Returns emitter, so calls can be chained.

4. removeListener(event, listener)
Removes a listener from the listener array for the specified event. Caution − It changes the array indices in the listener array behind the listener. removeListener will remove, at most, one instance of a listener from the listener array. If any single listener has been added multiple times to the listener array for the specified event, then removeListener must be called multiple times to remove each instance. Returns emitter, so calls can be chained.

5. removeAllListeners([event])
Removes all listeners, or those of the specified event. It's not a good idea to remove listeners that were added elsewhere in the code, especially when it's on an emitter that you didn't create (e.g. sockets or file streams). Returns emitter, so calls can be chained.

6. setMaxListeners(n)
By default, EventEmitters will print a warning if more than 10 listeners are added for a particular event. This is a useful default which helps finding memory leaks. Obviously not all Emitters should be limited to 10. This function allows that to be increased. Set to zero for unlimited.

7. listeners(event)
Returns an array of listeners for the specified event.

8. emit(event, [arg1], [arg2], [...])
Execute each of the listeners in order with the supplied arguments. Returns true if the event had listeners, false otherwise.

`Class Methods`
* listenerCount(emitter, event)
    Returns the number of listeners for a given event.

`Events`

1. newListener
    - event − String: the event name
    - listener − Function: the event handler function
    This event is emitted any time a listener is added. When this event is triggered, the listener may not yet have been added to the array of listeners for the event.

2. removeListener
    - event − String The event name
    - listener − Function The event handler function
    This event is emitted any time someone removes a listener. When this event is triggered, the listener may not yet have been removed from the array of listeners for the event.

#### Buffers
* Node provides Buffer class which provides instances to store raw data similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap.
* Buffer class is a global class that can be accessed in an application without importing the buffer module.

`Writing to buffer`
  - buf.write(string[, offset][, length][, encoding])

  string − This is the string data to be written to buffer.
  offset − This is the index of the buffer to start writing at. Default value is 0.
  length − This is the number of bytes to write. Defaults to buffer.length.
  encoding − Encoding to use. 'utf8' is the default encoding.

  This method returns the number of octets written. If there is not enough space in the buffer to fit the entire string, it will write a part of the string.

`Reading from Buffers`
  - buf.toString([encoding][, start][, end])
  encoding − Encoding to use. 'utf8' is the default encoding.
  start − Beginning index to start reading, defaults to 0.
  end − End index to end reading, defaults is complete buffer.

  This method decodes and returns a string from buffer data encoded using the specified character set encoding.

`Convert to JSON`
  - buf.toJSON()
  
  This method returns a JSON-representation of the Buffer instance.

`Concatenate Buffers`
  - Buffer.concat(list[, totalLength])
  list − Array List of Buffer objects to be concatenated.
  totalLength − This is the total length of the buffers when concatenated.
  
  This method returns a Buffer instance.

`Compare Buffers`
  - buf.compare(otherBuffer);
  otherBuffer − This is the other buffer which will be compared with buf

  Returns a number indicating whether it comes before or after or is the same as the otherBuffer in sort order.

`Copy Buffer`
  - buf.copy(targetBuffer[, targetStart][, sourceStart][, sourceEnd])
  targetBuffer − Buffer object where buffer will be copied.
  targetStart − Number, Optional, Default: 0
  sourceStart − Number, Optional, Default: 0
  sourceEnd − Number, Optional, Default: buffer.length

  No return value. Copies data from a region of this buffer to a region in the target buffer even if the target memory region overlaps with the source. If undefined, the targetStart and sourceStart parameters default to 0, while sourceEnd defaults to buffer.length.

`Slice Buffer`
  - buf.slice([start][, end])
  start − Number, Optional, Default: 0
  end − Number, Optional, Default: buffer.length

  Returns a new buffer which references the same memory as the old one, but offset and cropped by the start (defaults to 0) and end (defaults to buffer.length) indexes. Negative indexes start from the end of the buffer.

`Buffer Length`
  - buf.length;
  Returns the size of a buffer in bytes.

#### Streams
Streams are objects that let you read data from a source or write data to a destination in continuous fashion. 
In Node.js, there are four types of streams −
- Readable − Stream which is used for read operation.
- Writable − Stream which is used for write operation.
- Duplex − Stream which can be used for both read and write operation.
- Transform − A type of duplex stream where the output is computed based on input.

Each type of Stream is an EventEmitter instance and throws several events at different instance of times. 
For example, some of the commonly used events are −
  data − This event is fired when there is data is available to read.
  end − This event is fired when there is no more data to read.
  error − This event is fired when there is any error receiving or writing data.
  finish − This event is fired when all the data has been flushed to underlying system.

`Piping the Streams`
Piping is a mechanism where we provide the output of one stream as the input to another stream. 
It is normally used to get data from one stream and to pass the output of that stream to another stream. 
There is no limit on piping operations.

`Chaining the streams`
Chaining is a mechanism to connect the output of one stream to another stream and create a chain of multiple stream operations. It is normally used with piping operations. 

#### Global Objects
Node.js global objects are global in nature and they are available in all modules. We do not need to include these objects in our application, rather we can use them directly.

`__filename`
The __filename represents the filename of the code being executed. This is the resolved absolute path of this code file. For a main program, this is not necessarily the same filename used in the command line. The value inside a module is the path to that module file.

`__dirname`
The __dirname represents the name of the directory that the currently executing script resides in.

`setTimeout(cb, ms)`
The setTimeout(cb, ms) global function is used to run callback cb after at least ms milliseconds. The actual delay depends on external factors like OS timer granularity and system load. A timer cannot span more than 24.8 days.

This function returns an opaque value that represents the timer which can be used to clear the timer.

`clearTimeout(t)`
The clearTimeout(t) global function is used to stop a timer that was previously created with setTimeout(). Here t is the timer returned by the setTimeout() function.

`setInterval(cb, ms)`
The setInterval(cb, ms) global function is used to run callback cb repeatedly after at least ms milliseconds. The actual delay depends on external factors like OS timer granularity and system load. A timer cannot span more than 24.8 days.

This function returns an opaque value that represents the timer which can be used to clear the timer using the function clearInterval(t).

`Process`
Used to get information on current process. Provides multiple events related to process activities.

#### Frequently used utility modules
`OS `: Provides basic operating-system related utility functions.

`Path`: Provides utilities for handling and transforming file paths.

`Net`: Provides both servers and clients as streams. Acts as a network wrapper.

`DNS Module`: Provides functions to do actual DNS lookup as well as to use underlying operating system name resolution functionalities.

`Domain Module`: Provides ways to handle multiple different I/O operations as a single group.



#### Web Application Architecture

A Web application is usually divided into four layers −
* Client − This layer consists of web browsers, mobile browsers or applications which can make HTTP requests to the web server.
* Server − This layer has the Web server which can intercept the requests made by the clients and pass them the response.
* Business − This layer contains the application server which is utilized by the web server to do the required processing. This layer interacts with the data layer via the database or some external programs.
* Data − This layer contains the databases or any other source of data.

#### RESTful API
REST stands for REpresentational State Transfer. REST is web standards based architecture and uses HTTP Protocol.

A REST Server simply provides access to resources and REST client accesses and modifies the resources using HTTP protocol. Here each resource is identified by URIs/ global IDs. REST uses various representation to represent a resource like text, JSON, XML but JSON is the most popular one.

Following four HTTP methods are commonly used in REST based architecture.
* GET - This is used to provide a read only access to a resource.
* PUT - This is used to create a new resource.
* DELETE - This is used to remove a resource.
* POST - This is used to update a existing resource or create a new resource.

`RESTful Web Services`
A web service is a collection of open protocols and standards used for exchanging data between applications or systems. 
Software applications written in various programming languages and running on various platforms can use web services to exchange data over computer networks like the Internet in a manner similar to inter-process communication on a single computer. 
This interoperability (e.g., communication between Java and Python, or Windows and Linux applications) is due to the use of open standards.

Web services based on REST Architecture are known as RESTful web services. These webservices use HTTP methods to implement the concept of REST architecture. 
A RESTful web service usually defines a URI, Uniform Resource Identifier a service, which provides resource representation such as JSON and set of HTTP Methods.

... 

#### Scaling Application
Node.js runs in a single-thread mode, but it uses an event-driven paradigm to handle concurrency. It also facilitates creation of child processes to leverage parallel processing on multi-core CPU based systems.

....

#### File System
Node implements File I/O using simple wrappers around standard POSIX functions.
Every method in the fs module has synchronous as well as asynchronous forms. Asynchronous methods take the last parameter as the completion function callback and the first parameter of the callback function as error. 

...


#### Express
Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. It facilitates the rapid development of Node based Web applications.

* Allows to set up middlewares to respond to HTTP Requests.
* Defines a routing table which is used to perform different actions based on HTTP Method and URL.
* Allows to dynamically render HTML Pages based on passing arguments to templates.

 
Install the following important modules along with express −

* body-parser − This is a node.js middleware for handling JSON, Raw, Text and URL encoded form data.

* cookie-parser − Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

* multer − This is a node.js middleware for handling multipart/form-data.

Express application uses a callback function whose parameters are request and response objects.
    app.get('/', function (req, res) {
      // --
    })

  `Request Object` − The request object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
  `Response Object` − The response object represents the HTTP response that an Express app sends when it gets an HTTP request.

  You can print req and res objects which provide a lot of information related to HTTP request and response including cookies, sessions, URL, etc.

-----


### References:
1. https://dev.to/fedekau/building-awesome-clis-with-javascript-and-oclif-291o
1. https://www.youtube.com/watch?v=gG3pytAY2MY&list=PLWKjhJtqVAbmGQoa3vFjeRbRADAOC9drk&index=8
