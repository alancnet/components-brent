const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const Session = sequelize.define('session', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  startAt: Sequelize.DATE,
  endAt: Sequelize.DATE
})

module.exports = Session