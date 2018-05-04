require('./_common')
const { expect } = require('chai')
const server = require('../lib/server')
const config = require('../config')

describe('Server', () => {
  it('should listen on the specified port', async () => {
    await server.init()
    expect(server)
    expect(server.info.port).to.equal(config.server.port)
    expect(server.info.address).to.equal('0.0.0.0')
    await server.stop()
  })
})