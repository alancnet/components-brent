const _ = require('lodash')
const config = require('../../../config')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const aguid = require('aguid')
const { User, Session } = require('../../database')

module.exports = {
  post: async (request, h) => {
    const user = await User.find({where: {email: request.payload.email}})
    if (user) {
      const success = await bcrypt.compare(request.payload.password, user.password)
      if (success) {
        const sid = aguid()
        const exp = Math.floor(Date.now()/1000) + config.auth.jwtExpires
        await Session.create({
          id: sid,
          startTimestamp: Date.now(),
          endTimestamp: exp
        })
        const token = JWT.sign({sid, exp}, config.auth.jwtSecret);
        return {
          user: user.sanitize(),
          token
        }
      }
    }
    return h.response('Login failed').code(401)
  }
}