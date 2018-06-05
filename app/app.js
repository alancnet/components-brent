const angular = require('angular')
require('material-framework/app')
const routes = require('./routes')

const app = angular.module('app', ['material-framework'])

app.config(($routeProvider, $mdThemingProvider) => {
  // TODO: Select a theme
  const palettes = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey']
  const randomPalette = () => palettes[Math.floor(Math.random() * palettes.length)]
  $mdThemingProvider.theme('default')
    .primaryPalette(randomPalette())
    .accentPalette(randomPalette())
    .warnPalette(randomPalette())

  routes($routeProvider)

})

module.exports = app