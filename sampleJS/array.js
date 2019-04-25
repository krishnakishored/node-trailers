//Initialize array
const a1 = []
const a2 = [1, 2, 3]
const a3 = Array.of(1, 2, 3,4)
const a4 = Array(6).fill(1) //init an array of 6 items of value 1
const a5 = Array.of(1,2,3,4,5,6)

const l = a4.length
// console.log(l) //6

const multiply_2 = (item)=>{return item*2}
const minus_4 = (item)=>{return item-4}

console.log(a5.every(minus_4))
const b5 = a5.map(multiply_2)
console.log(b5)
const b6 = a5.filter(minus_4)
console.log(b6)

const b7 = a3.reduce((accumulator,currentValue,currentIndex,array)=>{return accumulator*currentValue},1)
console.log(b7) //24
// iteration 1: 1 * 1 => return 1
// iteration 2: 1 * 2 => return 2
// iteration 3: 2 * 3 => return 6
// iteration 4: 6 * 4 => return 24

// b5.forEach(v => {
//     console.log(v)
// })

// for(let v of a3){
//     console.log(v)
// }

const a = [1, 2, 3]
let it = a[Symbol.iterator]()
console.log(it.next().value) //1
console.log(it.next().value) //2
console.log(it.next().value) //3

let it2 = a.entries()
console.log(it2.next().value) //[0, 1]
console.log(it2.next().value) //[1, 2]
console.log(it2.next().value) //[2, 3]

let it3 = a4.keys()

console.log(it3.next().value) //0
console.log(it3.next().value) //1
console.log(it3.next().value) //2

console.log(a) //[ 1, 2, 3 ]
a.unshift(0)
a.unshift(-2, -1)
console.log(a) //[ -2, -1, 0, 1, 2, 3 ]

a.pop()
a.shift()
console.log(a) //[ -1, 0, 1, 2 ]

const a6 = Array.of(1,2,3,4,5,6,7,8,9)
a6.splice(0, 2) // get the first 2 items
console.log(a6) //[ 3, 4, 5, 6, 7, 8, 9 ]
a6.splice(3, 2) // get the  2 items starting from index 3
console.log(a6) // [ 3, 4, 5, 8, 9 ]

a6.splice(2, 3, 2, 'a', 'b') 
console.log(a6) //[ 3, 4, 2, 'a', 'b' ]

const b8 = a6.concat(a2)
console.log(b8) //doesn't alter a6


const aa = [1, 2, 3, 10, 11]
aa.sort() //1, 10, 11, 2, 3
console.log(aa)
const bb = [1, 'a', 'Z', 3, 2, 11]
bb.sort() 
console.log(bb) //1, 11, 2, 3, Z, a

const aa1 = [1, 10, 3, 2, 11]
aa1.sort((aa1, bb1) => aa1 - bb1) //1, 2, 3, 10, 11
console.log(aa1)

aa1.reverse()
console.log(aa1)

console.log(aa1.toString()) //11,10,3,2,1
console.log(aa1.join('+')) //11+10+3+2+1


const bb2 = Array.from(aa1)
const bb3 = Array.of(...aa1)
console.log(bb2)
console.log(bb3)

const bb4 = Array.from(aa1, x => x % 2 == 0)
console.log(bb4) //[ false, true, false, true, false ]


const c = [1, 2, 3, 4]
c.copyWithin(0, 2) 
console.log(c) // [3, 4, 3, 4]
const d = [1, 2, 3, 4, 5]
d.copyWithin(0, 2) 
console.log(d) // [3, 4, 5, 4, 5]
//0 is where to start copying into,
// 2 is where to start copying from
const e = [1, 2, 3, 4, 5]
e.copyWithin(0, 2, 4) // [3, 4, 3, 4, 5]
//4  is an end index
console.log(e)