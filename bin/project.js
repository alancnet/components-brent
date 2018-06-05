const config = require('../config')
const frameworkConfig = require('material-framework/config')
frameworkConfig.inject(config)
require('material-framework/bin/project')