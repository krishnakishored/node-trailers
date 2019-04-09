## JS quick reference

### JavaScript Closures
When a function is run, it’s `executed with the scope that was in place when it was defined`, and *__not__ with the state that’s in place when it is executed*.
- The scope basically is the set of variables which are visible.
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

### Map

### Filter