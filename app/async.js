const angular = require('angular')
const mod = angular.module('async', [])
mod.run(($q, $window, $rootScope) => {
  let timer = null
  const then = $q.prototype.then
  const setTimer = () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        $rootScope.$digest()
      })
    }
  }
  $q.prototype.then = function(successCallback, errorCallback, notifyCallback) {
    return then.call(
      this,
      successCallback && (val => {
        setTimer()
        return successCallback(val)
      }),
      errorCallback && (err => {
        setTimer()
        return errorCallback(err)
      }),
      notifyCallback && (msg => {
        setTimer()
        return errorCallback(err)
      })
    )
 }
})