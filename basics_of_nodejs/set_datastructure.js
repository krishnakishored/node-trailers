const m = new Set()

// Add items to a Set
s.add('one')
s.add('two')

// Check if an item is in the set
s.has('one') //true
s.has('three') //false

// Determine the number of items in a Set
s.size //property


// Delete all items from a set
s.clear()


// Iterate the items in a Set
// Use the keys() or values() methods - they are equivalent:
for (const k of s.keys()) {
    console.log(k)
}

for (const k of s.values()) {
    console.log(k)
}

//The entries() method returns an iterator, which you can use like this:
const i = s.entries()
console.log(i.next())

// calling i.next() will return each element as a { value, done = false } object until the iterator ends, at which point done is true.


// You can also use the forEach() method on the set:
s.forEach(v => console.log(v))

// or a for loop
for (const k of s) {
    console.log(k)
}
  
// Initialize a Set with values
const s = new Set([1, 2, 3, 4])

//Convert the Set keys into an array
const a = [...s.keys()]
const a = [...s.values()]
