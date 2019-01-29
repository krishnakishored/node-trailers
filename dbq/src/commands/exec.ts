import {Command, flags} from '@oclif/command'

const { printTable } = require('../../Utils')
const { executeQuery } = require('../../SqlExecute')

export default class Exec extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Exec)

    // const name = flags.name || 'world'
    // this.log(`hello ${name} from /Users/kishored/coding/js_coding/node-cli-trailers/dbq/src/commands/exec.ts`)

    const sql = args.file || "SELECT german_word,english_word FROM sentence LIMIT 5"
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
    const surveys = await executeQuery(sql)
    // console.log(surveys)// ToDo: To handle printing from here:

  }
}
