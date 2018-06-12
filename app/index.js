const assets = require('./assets')
require('../auto-crud')
const app = require('./app')
require('material-framework/auto-crud/app-factory')()
require('./services')
require('./components')
module.exports = {
  app,
  assets
}