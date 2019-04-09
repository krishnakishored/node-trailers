//closures
const bark = dog => {
    const say = `${dog} barked!`
    ;(() => console.log(say))()
  }
  
  bark(`Roger`) //Roger barked!

//----------------------------------------
  const prepareBark = dog => {
    const say = `${dog} barked!`
    return () => console.log(say)
  }
  
  const bark2 = prepareBark(`Roger`)
  
  bark2() //Roger barked! 

//----------------------------------------

const rogerBark = prepareBark(`Roger`) // Roger barked!
const sydBark = prepareBark(`Syd`) //Syd barked!

rogerBark()
sydBark()

//----------------------------------------

/**
 * As you can see, the state of the variable 'say' is linked to the function that’s returned from prepareBark().
 * Also notice that we redefine a new say variable the second time we call prepareBark(), but that does not affect the state of the first prepareBark() scope.
 * This is how a closure works: the function that’s returned keeps the original state in its scope.


 */