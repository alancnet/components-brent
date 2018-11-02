const app = require('../app')

app.component('appHeaderText', {
  template: html`
    <h1>{{$ctrl.formattedText}}</h1>
  `,
  bindings: {
    text: '<'
  },
  controller: ['$scope', function($scope) {
    $scope.$watch('$ctrl.text', (text) => {
      this.formattedText = `!!${text.toUpperCase()}!!`
    })
  }]
})