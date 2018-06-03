const app = require('../app')

app.component('appHomePage', {
  template: html`
    <app-home-area>
      <div layout="row">
        <md-button flex ng-href="login" class="md-raised md-primary">Login</md-button>
      </div>
    </app-home-area>
  `
})