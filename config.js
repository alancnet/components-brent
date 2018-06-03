module.exports = {
  auth: {
    jwtSecret: '8af06d11-2c53-4f0b-86d7-dd24594da463',
    jwtExpires: 7 * 24 * 60 * 60,
    saltRounds: 10
  },
  server: {
    port: process.env.NODE_PORT || 3002
  },
  sequelize: {
    // See http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
    dialect: 'sqlite',
    database: 'project',
    username: null,
    password: null,
    host: null,
    port: null,
    storage: 'project.db',
    operatorsAliases: false,
    logging: false
  }
}