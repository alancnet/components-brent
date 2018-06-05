const app = require('../app')

app.component('appDashboardPage', {
  template: html`
    <app-user-area>
      Dashboard
    </app-user-area>
  `,
  controllerAs: 'dashboard',
  controller: function() {
  }
})