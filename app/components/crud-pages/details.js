const _ = require('lodash')
const app = require('../../app')
/**
 * @param {CrudPagesOptions} opts 
 */
const details = (opts) => {
  const defaultInput = column => html`
    <md-input-container>
      <label>${column.titleName}</label>
      <input type="${column.type || 'text'}" ng-model="model.${raw(column.camelName)}" />
    </md-input-container>
  `

  app.component(`app${opts.pascalName}DetailsPage`, {

    template: html`
      <app-user-area>
        <h1>{{ctrl.isNew ? 'New ${opts.titleName}' : '${opts.titleName} Details'}}</h1>
        <form name="form" ng-submit="ctrl.submit()">
          ${opts.columns.map(c => c.input || defaultInput(c))}

          <div>
            <md-button type="submit" class="md-raised md-primary">Submit</md-button>
          </div>

        </form>
      </app-user-area>
    `,
    controllerAs: 'ctrl',
    controller: function(api, $scope, $routeParams, $mdToast, $location) {
      this.isNew = $routeParams.id === 'new'
      const crud = api.crud(opts.apiPrefix)
      let original
      if (this.isNew) {
        original = {}
        $scope.model = Object.create(original)
      } else {
        crud.read($routeParams.id).then(model => {
          original = model
          $scope.model = Object.create(original)
        })
      }

      this.submit = async () => {
        try {
          if (this.isNew) {
            await crud.create($scope.model)
          } else {
            const obj = {}
            for (var key in $scope.model) {
              if ($scope.model.hasOwnProperty(key)) {
                obj[key] = $scope.model[key]
              }
            }
            await crud.update(original.id, obj)
          }
          $mdToast.showSimple(`${opts.titleName} saved.`)
          $location.url(opts.appPrefix)
        } catch (err) {
          console.error(err)
          $mdToast.showSimple(`Could not save ${opts.titleName}: ${err.message || err}`)
        }
      }

    }

  })
}

module.exports = details