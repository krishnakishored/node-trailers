const printTable = (rows) => {
  if (rows.length) {
    const Table = require('cli-table3')
    const _ = require('lodash')
    const head = Object.keys(rows[0]).map(key => _.startCase(key))
    const table = new Table({ head })
    rows.forEach(row => table.push(Object.values(row)))
    console.log(table.toString())
  }
  else {
    console.log('No records in the table')
  }
}



module.exports = {
  printTable
}
