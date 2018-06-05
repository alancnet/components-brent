const app = require('../app')
const { dashboardIcon } = require('../assets')

app.component('appUserAreaNav', {
  template: html`
    <h3>
      Intelligence
    </h3>

    <md-menu-item>
      <md-button ng-href="/dashboard">
        <md-icon md-svg-icon="${dashboardIcon}"></md-icon>
        Dashboard
      </md-button>
    </md-menu-item>
  `
})