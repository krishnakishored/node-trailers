// Import the package main module
const csv = require('csv')
// Use the module
csv.generate  ({seed: 1, length: 10}).pipe(
csv.parse     ()).pipe(
csv.transform (function(record){
                return record.map(function(value){
                  return value.toUpperCase()
              })})).pipe(
csv.stringify ()).pipe(process.stdout)