require('../auto-crud')
const { app } = require('material-framework/server')
const routes = require('./routes')
routes(app)
