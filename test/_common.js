const config = require('../config');
config.sequelize = {
  // See http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
  dialect: 'sqlite',
  database: 'project',
  username: null,
  password: null,
  host: null,
  port: null,
  storage: ':memory:',
  operatorsAliases: false,
  logging: false
}
config.server.port = 51391
const database = require('../lib/database')
database.init()