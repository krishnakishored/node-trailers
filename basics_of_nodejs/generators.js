function *calculator(input) {
    let doubleThat = 2 * (yield (input / 2))
    let another = yield (doubleThat)
    return (input * doubleThat * another)
}

const calc = calculator(10)

//Then we start the iterator on our generator:
console.log(calc.next())

//This first iteration starts the iterator. The code returns this object:
/**
{
  done: false
  value: 5
}
*/
//What happens is: the code runs the function, with input = 10 as it was passed in the generator constructor.
//It runs until it reaches the yield, and returns the content of yield: input / 2 = 5. 
//So we got a value of 5, and the indication that the iteration is not done (the function is just paused).


console.log(calc.next(7)) //iteration#2

/**
{
  done: false
  value: 14
}
*/

//7 was placed as the value of doubleThat. Important: you might read like input / 2 was the argument, but that’s just the return value of the first iteration. 
//We now skip that, and use the new input value, 7, and multiply it by 2.
//We then reach the second yield, and that returns doubleThat, so the returned value is 14.

//In the next, and last, iteration, we pass in 100

console.log(calc.next(100))

/**
{
  done: false
  value: 14000
}
*/


//As the iteration is done (no more yield keywords found) and 
//we just return (input * doubleThat * another) which amounts to 10 * 14 * 100