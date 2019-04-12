## JS quick reference

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

### Generators
Generators are a special kind of function with the ability to pause itself, and resume later, allowing other code to run in the meantime.

- The code decides that it has to wait, so it lets other code “in the queue” to run, and keeps the right to resume its operations “when the thing it’s waiting for” is done.
- All this is done with a single, simple keyword: `yield`. When a generator contains that keyword, the execution is halted.
- A generator can contain many yield keywords, thus halting itself multiple times, and it’s identified by the `*function`


### let and const
- `var` is traditionally function scoped.
- `let` is a new variable declaration which is block scoped.
    This means that declaring let variables in a for loop, inside an if or in a plain block is not going to let that variable “escape” the block, while vars are hoisted up to the function definition.

- `const` is just like let, but immutable.


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







### Map datastructure
ECMAScript 6 (also called ES2015) introduced the `Map` data structure to the JavaScript world, along with `Set`. Before its introduction, people generally used objects as maps, by associating some object or value to a specific key value:



### Array Functions - map, filter, reduce, find
`map` returns an array with the same length,        
    - _Execute something on every element with map_       

`filter` as the name implies, it returns an array with less items than the original array
`reduce` returns a single value (or object)
`find` returns the first items in an array that satisfies a condition
    - _`filter()` and `reduce()` will iterate over all the array items, while `find()` will be faster_

-----

## Oclif
oclif is a framework for building CLIs in Node. 
With oclif you can create 2 different CLI types: single and multi.
* Single CLIs are like ls or curl. They can accept arguments and flags. Single CLIs can optionally be just a single file.       
`$ npm install -g oclif`        
`$ npm update -g oclif` (to get the newer releases of the generator)        
        
    `$ npx oclif single mynewcli`   
        npx is included in npm and automatically runs and installs the oclif generator.         
        To run `$ mynewcli` instead of `$ ./bin/run` you'll need to link your CLI locally using `$ npm link`

* Multi CLIs are like git or heroku. They have subcommands that are themselves single CLIs. In the package.json there is a field oclif.commands that points to a directory. Multi-command CLIs may also include plugins.        
`$ npx oclif multi mynewmulticli`

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


