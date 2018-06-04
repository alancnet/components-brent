const app = require('../../app')
const { undoIcon} = require('../../assets')

/**
 * @param {CrudPagesOptions} opts 
 */
const list = (opts) => {
  const defaultHeader = column => html`<th md-column>${column.titleName}</th>`
  const defaultCell = column => html`<td md-cell>{{${raw(opts.camelName)}.${raw(column.camelName)}}}</td>`

  app.component(`app${opts.pascalPlural}TrashPage`, {
    template: html`
      <app-user-area>
        <h1>${opts.titlePlural} Trash</h1>
        <md-table-container>
          <table md-table md-row-select md-auto-select md-multiple ng-model="ctrl.selected" md-progress="ctrl.promise">
              <thead md-head md-order="query.order" md-on-reorder="ctrl.getRecords">
                <tr md-row>
                  ${opts.columns.filter(c => c.inList).map(c => c.header || defaultHeader(c))}
                  <th md-column>Actions</th>
                </tr>
              </thead>
              <tbody md-body>
                <tr md-row md-select="${opts.camelName}" md-select-id="name" md-auto-select ng-repeat="${raw(opts.camelName)} in ctrl.data track by ${raw(opts.camelName)}.id">
                  ${opts.columns.filter(c => c.inList).map(c => c.cell || defaultCell(c))}
                  <td md-cell>
                    <md-button ng-click="ctrl.undelete(${raw(opts.camelName)})">
                      <md-icon md-svg-icon="${undoIcon}"></md-icon>
                      Undelete
                    </md-button>
                  </td>
                </tr>
              </tbody>
            </table>
        </md-table-container>
      </app-user-area>
    `,
    controllerAs: 'ctrl',
    controller: function(api, $mdToast, $location) {
      const crud = api.crud(`${opts.apiPrefix}`)

      this.selected = []
      this.data = []

      this.getRecords = () => {
        this.promise = crud.trash().then(data => {
          this.data = data
        })
      }

      this.undelete = async rec => {
        try {
          await crud.undelete(rec.id)
          $mdToast.showSimple(`${opts.titleName} undeleted.`)
          $location.url(`${opts.appPrefix}`)
        } catch (err) {
          console.error(err)
          $mdToast.showSimple(`Could not undelete ${opts.titleName}: ${err.message || err}`)
        }

      }

      this.getRecords()      
    }

  })
}

module.exports = list