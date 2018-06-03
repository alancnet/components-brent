const app = require('../app')

app.component('appLoginPage', {
  template: html`
    <app-home-area>
      <form name="form" ng-submit="login.submit(form)" class="md-inline-form" layout-align="center" layout="column" novalidate>
        <md-input-container>
          <label>Email</label>
          <input type="email" required md-no-asterisk="true"  ng-model="login.model.email" />
        </md-input-container>
        <md-input-container>
          <label>Password</label>
          <input type="password" required md-no-asterisk="true"  ng-model="login.model.password" />
        </md-input-container>
        <md-button type="submit" class="md-raised md-primary">Login</md-button>
        <md-button class="" href="/forgot-password">Forgot password</md-button>
      </form>
    </app-home-area>
  `,
  controllerAs: 'login',
  controller: function(api, $mdToast, $location) {
    this.submit = async form => {
      try {
        const res = await api.login(this.model)
        api.setToken(res.token)
        $location.url('/dashboard')
      } catch (err) {
        console.log($mdToast)
        $mdToast.showSimple(`Login failed`)
      }
    }
  }
})