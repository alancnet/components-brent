const _ = require('lodash')
const Sequelize = require('sequelize')
const config = require('../../config')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize(config.sequelize)

const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  resetToken: Sequelize.STRING
}, {
  indexes: [
    {
      unique: true,
      fields: ['email']
    }
  ],
  setterMethods: {
    password(value) {
      this.setDataValue('password', bcrypt.hashSync(value, config.auth.saltRounds))
    }
  }
})

User.prototype.sanitize = function() {
  return _.omit(this.dataValues, 'password', 'resetToken')
}

const Session = sequelize.define('session', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  startTimestamp: Sequelize.DATE,
  endTimestamp: Sequelize.DATE
})

module.exports = {
  init: () => sequelize.sync(),
  User,
  Session
}