const config = require('../../config')
const bcrypt = require('bcrypt')
const sequelize = require('./sequelize')
const User = require('./user')
const Session = require('./session')
const appIndex = require('./app-index')

module.exports = Object.assign({
  init: () => sequelize.sync(),
  User,
  Session
}, appIndex)