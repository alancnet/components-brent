const app = require('../app')

app.component('appDashboardPage', {
  template: html`
    <app-user-area>
      <app-header-text text="$ctrl.name"></app-header-text>
      Hello, {{$ctrl.name}}
    </app-user-area>
  `,
  bindings: {
    user: '<'
  },
  controller: function($scope) {
    this.name = "Alan"
  }
})