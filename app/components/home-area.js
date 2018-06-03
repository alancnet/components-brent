const app = require('../app')
const { genericLogo } = require('../assets')

app.component('appHomeArea', {
  transclude: true,
  template: html`
    <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-grow: 100;">
      <div style="flex-basis: auto">
        <div class="logo-container">
          <img class="logo" src="${genericLogo}" />
        </div>
        <div class="home-content" ng-transclude>
          <!-- content -->
        </div>
      </div>
    </div>
  `,
  controller: function() {
  }
})
