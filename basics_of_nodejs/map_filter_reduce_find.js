// A loop would look like this:

const performSomething = (item) => {
    //...
    return item
  }
  const items = ['a', 'b', 'c']
  items.forEach((item) => {
    performSomething(item)
  })

// ------------- map -----------------------  
//This generates a new array, without editing the original one (what we call immutability)

const items = ['a', 'b', 'c']
const newArray = items.map((item) => performSomething(item))

//Since we use a single function in the map callback function,
// we can rewrite the sample as:
const newArray2 = items.map(performSomething)

// ------------- find -----------------------  

// Sometimes you need to look for a specific item in the array, and return it.

const items2 = [
    { name: 'a', content: { /* ... */ }},
    { name: 'b', content: { /* ... */ }},
    { name: 'c', content: { /* ... */ }}
  ]

//using a loop
for (const item of items2) {
    if (item.name === 'b') {
      return item
    }
}

// Here is the non-loop version, using find() (ES6+):
const b1 = items.find((item) =>  item.name === 'b')

//Same functionality with filter()
const b2 = items.filter((item) => item.name === 'b').shift()
// shift() returns the first item in the array without raising an error if the array is empty (returns undefined in that case).

//using reduce - doesn't make sense in practice
const b3 = items.reduce((result, item) => {
    if (item.name === 'b') { result = item }
    return result
  }, null)


// ------------- reduce -----------------------    

const items2 = [
    { name: 'a', content: { value: 1 }},
    { name: 'b', content: { value: 2 }},
    { name: 'c', content: { value: 3 }}
]

let count = 0
for (const item of items2) {
  count += item.content.value
}



const count = items2.reduce((result, { content: { value } }) => result + value, 0)
