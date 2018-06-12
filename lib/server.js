require('../auto-crud')
const { app } = require('@alancnet/material-framework/server')
const routes = require('./routes')
routes(app)
