const app = require('./app')
// TODO: Register app specific services
app.config(($routeProvider, $mdThemingProvider) => {
  // TODO: App Title
  window.title = 'My App'

  // TODO: Select a theme
  const palettes = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey']
  const randomPalette = () => palettes[Math.floor(Math.random() * palettes.length)]
  $mdThemingProvider.theme('default')
    .primaryPalette(randomPalette())
    .accentPalette(randomPalette())
    .warnPalette(randomPalette())

  // TODO: App Routes
  //  $routeProvider.when('/test', {template: '<app-test-page />'})

})