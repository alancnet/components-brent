const angular = require('angular')
const routes = require('./routes')
require('angular-material/angular-material.css')
require('angular-material-data-table/dist/md-data-table.min.css')
require('angular-route')
require('angular-material')
require('angular-material-data-table')
require('./async')
window.jQuery = require('jquery')

const es6Html = require('es6-string-html-template')
window.html = es6Html.html
window.raw = es6Html.raw
window.encode = es6Html.encode

const app = angular.module('app', ['ngRoute', 'ngMaterial', 'async', 'md.data.table'])

app.config(($routeProvider, $locationProvider, $mdThemingProvider) => {
  routes($routeProvider)
  $locationProvider.html5Mode(true)
})


module.exports = app;