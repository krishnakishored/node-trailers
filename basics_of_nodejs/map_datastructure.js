const m = new Map()

// Add items to a Map
m.set('color', 'red')
m.set('age', 2)

// Get an item from a map by key
const color = m.get('color')
const age = m.get('age')

// Delete an item from a map by key
m.delete('color')

// Delete all items from a map
m.clear()

// Check if a map contains an item by key
const hasColor = m.has('color')

// Find the number of items in a map
const size = m.size

// Initialize a map with values
const m2 = new Map([['color', 'red'], ['owner', 'Flavio'], ['age', 2]])

// If you try to get a non-existing key using get() out of a map, it will return undefined.

//Iterate over map keys
for (const k of m2.keys()) {
    console.log(k)
}

//Iterate over map values
for (const v of m2.values()) {
    console.log(v)
}

//Iterate over map key, value pairs
for (const [k, v] of m2.entries()) {
    console.log(k, v)
}

//simplified
for (const [k, v] of m2) {
    console.log(k, v)
}

//Convert the map keys into an array
const k = [...m2.keys()]

// Convert the map values into an array
const v = [...m2.values()]

console.log(k) //[ 'color', 'owner', 'age' ]
console.log(v) //[ 'red', 'Flavio', 2 ]