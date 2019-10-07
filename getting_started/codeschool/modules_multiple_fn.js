const foo = function(){
    console.log('In foo')
}

const bar = function(){
    console.log('In bar')
}

const baz = function(){
    console.log('In baz')
}

// baz() // this remains a private function

exports.foo = foo
exports.bar = bar