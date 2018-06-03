const express = require('express')
const C = require('./controllers')
const config = require('../config')
const path = require('path')
const chalk = require('chalk')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()
app.use(bodyParser.json())

routes(app)
app.use(express.static('./public'))
app.all('/api/*', (req, res) => {
  res.send(404)
})
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public/index.html'));
})
app.start = () => new Promise((resolve, reject) => {
  try {
    const listener = app.listen(config.server.port, function() {
      app.address = listener.address()
      console.log(`Server running at ${chalk.underline(chalk.blue(`http://localhost:${app.address.port}`))}`)
    })
  } catch (e) {
    reject(e)
  }
})
module.exports = app