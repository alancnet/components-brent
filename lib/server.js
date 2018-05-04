const { Server } = require('hapi')
const controllers = require('./controllers')
const config = require('../config')

const server = new Server(config.server)
server.route({ method: 'POST', path: '/auth/login', handler: controllers.auth.login.post })

server.init = async () => {
  await controllers.auth.init(server)
  await server.start()
  console.log(`Server running at ${server.info.port}`)
}

module.exports = server