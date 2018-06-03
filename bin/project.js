const Vorpal = require('vorpal')
const prompt = require('password-prompt')
const database = require('../lib/database')
const { User } = database
const controllers = require('../lib/controllers')
const chalk = require('chalk')
const asTable = require('as-table')
const config = require('../config')
const server = require('../lib/server')

const vorpal = new Vorpal()
const main = async () => {
  await database.init();

  vorpal.command('create user <email> [password]', 'Creates a user')
  .action(async model => {
    if (!model.password) {
      model.password = await prompt('Password: ')
    }
    const user = await User.create(model)
    console.log('Created user')
  })

  vorpal.command('list users', 'Lists all users')
  .action(async () => {
    console.log(asTable((await User.all()).map(x => x.dataValues)))
  })

  vorpal.command('server', 'Runs the web server')
  .action(() => server.start())

  vorpal.delimiter('project>')
  if (process.argv.length > 2) {
    await vorpal.parse(process.argv)
  } else {
    await vorpal.show()
  }
}

main().catch(err => {
  console.error(chalk.red('Runtime Error!'))
  console.error(err)
})

process.on('uncaughtException', (err) => {
  console.error(chalk.red(`Uncaught Exception!`))
  console.error(err)  
})
process.on('unhandledRejection', (err) => {
  console.error(chalk.red(`Unhandled Promise Failure!`))
  console.error(err)
  process.exit(1)
})