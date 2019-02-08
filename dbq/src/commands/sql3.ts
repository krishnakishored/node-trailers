import {Command, flags} from '@oclif/command'
import { callbackify } from 'util';
// import {printTable} from '../../Utils'

export default class Sql3 extends Command {
  static description = 'Execute the sqlite3 queries'

  static flags = {
    help: flags.help({char: 'h'}),
    database: flags.string({ char: 'd', description: 'path to sqlite3 database', required: false, default: './db/inquisitive.db' }),
    // user: flags.string({ char: 'u', description: 'sqlite3 user', required: true, default: 'administrator' }),
    // password: flags.string({ char: 'p', required: true, description: 'user password', default:'password' }),
  }

  static args = [{name: 'query', required:true, description:'Sqlite3 query to run'}]


  async run() {
    const {args, flags} = this.parse(Sql3)
    // this.log(`sqlite3: ${flags.address} ${args.query} from ${__filename}`)

    //To print the rows as a table
    const Table = require('cli-table3')

        // instantiate
    let table = new Table({
      // head: ['german', 'english']
    // , colWidths: [100, 200]
    });



    // -- Handle Sqlite
    const sqlite3 = require('sqlite3').verbose(); //Sets the execution mode to verbose to produce long stack traces. There is no way to reset this. See the wiki page on debugging for more information.

    // const path = require('path')
    // const dbPath = path.resolve(__dirname, '../inquisitive.db')
    // console.log(__dirname)

    let file = flags.database
    const db = new sqlite3.Database(file); //new sqlite3.Database(filename, [mode], [callback])

    db.all(args.query, function (err, rows) {
      rows.forEach(function (row) {
        // console.log(row.german_word, row.english_word);
        table.push([row.german_word,row.english_word])
      })
    });
    db.close(()=>{console.log(table.toString())});
  }
}
