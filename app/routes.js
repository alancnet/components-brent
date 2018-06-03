module.exports = function($routeProvider) {
  $routeProvider.when('/test', {template: '<app-test-page />'})
  $routeProvider.when('/login', {template: '<app-login-page />'})
  $routeProvider.when('/dashboard', {template: '<app-dashboard-page />'})
  $routeProvider.when('/', {template: '<app-home-page />'})
  $routeProvider.when('/users', {template: '<app-users-page />'})
  $routeProvider.when('/users/:id', {template: '<app-user-details-page />'})
  $routeProvider.otherwise({template: '<h1>404</h1>'})
}