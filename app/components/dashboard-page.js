const app = require('../app')

app.component('appDashboardPage', {
  template: html`
    <app-user-area>
      Dashboard goes here
    </app-user-area>
  `,
  controllerAs: 'dashboard',
  controller: function() {

  }
})