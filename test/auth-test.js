require('./_common')
const { User } = require('../lib/database')
const { expect } = require('chai')
const controllers = require('../lib/controllers')
const JWT = require('jsonwebtoken')
const config = require('../config')
const server = require('../lib/server')

describe('Authentication', () => {
  let user
  before(async () => {
    user = await User.create({
      email: 'test@example.com',
      password: 'hello world'
    })
  })
  describe('user record', () => {
    let userRecord
    before(async () => {
      userRecord = await User.find({where:{email: 'test@example.com'}})
    })
    it('should represent the user', async () => {
      expect(userRecord).to.not.be.null
      expect(userRecord.email).to.equal('test@example.com')
    })
    it('should have an encrypted password', () => {
      expect(userRecord.password).to.not.equal('hello world')
    })
  })
  it('should be able to log in', async () => {
    const result = (await server.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: 'test@example.com',
        password: 'hello world'
      }
    })).result
    expect(result).to.exist
    expect(result.user).to.exist
    expect(result.token).to.exist
    expect(result.user.email).to.equal('test@example.com')

    const decoded = await JWT.verify(result.token, config.auth.jwtSecret)

    expect(decoded).to.exist
    expect(decoded.iat).to.be.finite
    expect(decoded.exp - decoded.iat).to.equal(config.auth.jwtExpires)
  })
  it('should reject invalid passwords', async () => {
    const result = await server.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: 'test@example.com',
        password: 'goodbye world'
      }
    })
    expect(result.statusCode).to.equal(401)
  })
  it('should reject invalid logins', async () => {
    const result = await server.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: 'idontexist@example.com',
        password: 'hello world'
      }
    })
    expect(result.statusCode).to.equal(401)
  })
})