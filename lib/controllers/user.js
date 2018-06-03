const crudController = require('./crud-controller')
const { User } = require('../database')

module.exports = crudController({
  Type: User
})