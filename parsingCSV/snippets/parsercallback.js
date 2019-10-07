const parse = require('csv-parse')
const assert = require('assert')

const input = '#Welcome\n"1","2","3","4"\n"a","b","c","d"'
parse(input, {
  comment: '#'
}, function(err, output){
  assert.deepEqual(
    output,
    [ [ '1', '2', '3', '4' ], [ 'a', 'b', 'c', 'd' ] ]
  )
})