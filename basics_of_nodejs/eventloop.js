const bar1 = () => console.log('bar1')
const bar2 = () => console.log('bar2')
const bar3 = () => console.log('bar3')

const baz = () => console.log('baz')


const foo1 = () => {
    console.log('\nfoo')
    bar1() //  foo bar baz
    baz()
}


const foo2 = () => {
    console.log('\nfoo2')
    // we first call setTimeout, passing bar as an argument, and we instruct it to run immediately as fast as it can, passing 0 as the timer. 
    setTimeout(bar2,0) //  foo baz bar
    baz()
}


const foo3 = () => {
    console.log('\nfoo3')
    setTimeout(bar3, 0)
    new Promise((resolve, reject) =>
      resolve('should be right after baz, before bar')
    ).then(resolve => console.log(resolve))
    baz()
  }


foo1()

foo2()

foo3()