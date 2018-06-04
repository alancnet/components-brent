const app = require('../../app')
const {editIcon, createIcon, deleteIcon} = require('../../assets')

/**
 * @param {CrudPagesOptions} opts 
 */
const list = (opts) => {
  const defaultHeader = column => html`<th md-column>${column.titleName}</th>`
  const defaultCell = column => html`<td md-cell>{{${raw(opts.camelName)}.${raw(column.camelName)}}}</td>`

  app.component(`app${opts.pascalPlural}Page`, {
    template: html`
      <app-user-area>
        <h1>${opts.titlePlural}</h1>
        <md-table-container>
          <table md-table md-row-select md-auto-select  ng-model="ctrl.selected" md-progress="ctrl.promise">
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
                    <md-button ng-href="${opts.appPrefix}/{{${raw(opts.camelName)}.id}}">
                      <md-icon md-svg-icon="${editIcon}"></md-icon>
                      Edit
                    </md-button>
                    <md-button ng-click="ctrl.delete(${raw(opts.camelName)})">
                      <md-icon md-svg-src="${deleteIcon}"></md-icon>
                      Delete
                    </md-button>

                  </td>
                </tr>
              </tbody>
            </table>
        </md-table-container>
        <div layout="row" layout-align="end">
          <md-button class="md-fab" aria-label="Add ${opts.titleName}" ng-href="${opts.appPrefix}/new">
            <md-icon md-svg-src="${createIcon}"></md-icon>
          </md-button>
        </div>
      </app-user-area>
    `,
    controllerAs: 'ctrl',
    controller: function(api, $mdToast) {
      const crud = api.crud(opts.apiPrefix)

      this.selected = []
      this.data = []

      this.getRecords = () => {
        this.promise = crud.list().then(data => {
          this.data = data
        })
      }

      this.delete = async (record) => {
        try {
          await crud.delete(record.id)
          $mdToast.showSimple(`${opts.titleName} deleted.`)
        } catch (err) {
          console.error(err)
          $mdToast.showSimple(`Could not delete ${opts.titleName}: ${err.message || err}`)
        }
      }

      this.getRecords()      
    }

  })
}

module.exports = list