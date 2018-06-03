const app = require('../app')
const { genericLogo, menuIcon, userIcon, dashboardIcon } = require('../assets')


app.component('appUserArea', {
  transclude: true,
  template: html`
    <div layout="row" flex>
      <md-sidenav flex
        md-component-id="left"
        class="md-sidenav-left"
        md-is-locked-open="$mdMedia('gt-md')"
        md-whiteframe="4"
        layout="column">

        <header>
          <div class="logo-container">
            <img class="logo" src="${genericLogo}" />
          </div>          
        </header>

        <h3>
          Intelligence
        </h3>
        <md-menu-item>
          <md-button ng-href="/dashboard">
            <md-icon md-svg-icon="${dashboardIcon}"></md-icon>
            Dashboard
          </md-button>
        </md-menu-item>

        <h3>
          Administration
        </h3>

        <md-menu-item>
          <md-button ng-href="/users">
            <md-icon md-svg-icon="${userIcon}"></md-icon>
            Users
          </md-button>
        </md-menu-item>
      </md-sidenav>
      <md-content flex>
        <md-toolbar>
          <div class="md-toolbar-tools">
            <md-button class="md-icon-button" aria-label="Settings" ng-hide="$mdMedia('gt-md')" ng-click="ctrl.toggleNav()">
              <md-icon md-svg-icon="${menuIcon}"></md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <div layout-padding>
          <div ng-transclude></div>
        </div>
      </md-content>
    </div>
  `,
  controllerAs: 'ctrl',
  controller: function($mdSidenav, $mdMedia, $scope) {
    $scope.$mdMedia = $mdMedia
    this.showNav = false
    this.toggleNav = () => {
      console.log('toggle')
      $mdSidenav('left').toggle()
    }
  }
})
