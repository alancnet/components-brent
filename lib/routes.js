const crudRoute = require('./crud-route')
const asyncHandler = require('express-async-handler')
const C = require('./controllers')

module.exports = app => {
  app.post('/api/auth/login', asyncHandler(C.auth.login.post))
  crudRoute({ app, controller: C.user, typeName: 'User' })
}