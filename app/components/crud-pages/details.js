const _ = require('lodash')
const app = require('../../app')
const details = ({
  typeName,
  typePlural,
  camelName,
  camelPlural,
  paramName,
  paramPlural,
  apiPrefix,
  appPrefix,
  columns
}) => {
  const defaultInput = column => html`
    <md-input-container>
      <label>${column.fieldName}</label>
      <input type="${column.type || 'text'}" ng-model="model.${raw(column.camelName)}" />
    </md-input-container>
  `

  app.component(`app${typeName}DetailsPage`, {

    template: html`
      <app-user-area>
        <h1>${typeName}</h1>
        <form name="form" ng-submit="ctrl.submit()">
          ${columns.map(c => c.input || defaultInput(c))}

          <div>
            <md-button type="submit">Submit</md-button>
          </div>

        </form>
      </app-user-area>
    `,
    controllerAs: 'ctrl',
    controller: function(api, $scope, $routeParams, $mdToast) {
      const crud = api.crud(apiPrefix)
      let original
      if ($routeParams.id === 'new') {
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
          if ($routeParams.id === 'new') {
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
          $mdToast.showSimple(`${typeName} saved.`)
        } catch (err) {
          console.error(err)
          $mdToast.showSimple(`Could not save ${typeName}: ${err.message || err}`)
        }
      }

    }

  })
}

module.exports = details