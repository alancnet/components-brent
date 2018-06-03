const app = require('../app')
const { genericLogo } = require('../assets')

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