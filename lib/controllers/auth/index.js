const Joi = require('joi')
const loginModel = require('../../models/login')
const hapiLogin = require('hapi-login')

const init = async server => {
  // await server.auth.strategy('jwt', 'jwt', {
  //   key: process.env.JWT_SECRET || 'dev',          // Never Share your secret key
  //   validate: controllers.auth.validate,
  //   verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
  // })
}

module.exports = {
  init,
  login: require('./login')
}