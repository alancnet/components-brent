const _ = require('lodash')
const config = require('../../../config')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const aguid = require('aguid')
const { User, Session } = require('../../database')

module.exports = {
  post: async (req, res) => {
    const user = await User.find({where: {email: req.body.email}})
    if (user) {
      const success = await bcrypt.compare(req.body.password, user.password)
      if (success) {
        const sid = aguid()
        const exp = Math.floor(Date.now()/1000) + config.auth.jwtExpires
        await Session.create({
          id: sid,
          startAt: Date.now(),
          endAt : exp
        })
        const token = JWT.sign({sid, exp}, config.auth.jwtSecret);
        res.status(200).send({
          user: user.sanitize(),
          token
        })
      }
    }
    return res.send(401)
  }
}