const app = require('../../app')
const {editIcon, createIcon} = require('../../assets')
const list = ({
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
  const defaultHeader = column => html`<th md-column>${column.fieldName}</th>`
  const defaultCell = column => html`<td md-cell>{{${raw(camelName)}.${raw(column.camelName)}}}</td>`

  app.component(`app${typePlural}Page`, {
    template: html`
      <app-user-area>
        <h1>${typePlural}</h1>
        <md-table-container>
          <table md-table md-row-select md-auto-select  ng-model="ctrl.selected" md-progress="ctrl.promise">
              <thead md-head md-order="query.order" md-on-reorder="ctrl.getRecords">
                <tr md-row>
                  ${columns.map(c => c.header || defaultHeader(c))}
                  <th md-column>Actions</th>
                </tr>
              </thead>
              <tbody md-body>
                <tr md-row md-select="${camelName}" md-select-id="name" md-auto-select ng-repeat="${raw(camelName)} in ctrl.data track by ${raw(camelName)}.id">
                  ${columns.map(c => c.cell || defaultCell(c))}
                  <td md-cell>
                    <md-button ng-href="${appPrefix}/{{${raw(camelName)}.id}}">
                      <md-icon md-svg-icon="${editIcon}"></md-icon>
                      Edit
                    </md-button>
                  </td>
                </tr>
              </tbody>
            </table>
        </md-table-container>
        <div layout="row" layout-align="end">
          <md-button class="md-fab" aria-label="Add ${typeName}" ng-href="${appPrefix}/new">
            <md-icon md-svg-src="${createIcon}"></md-icon>
          </md-button>
        </div>
      </app-user-area>
    `,
    controllerAs: 'ctrl',
    controller: function(api) {
      const crud = api.crud(apiPrefix)

      this.selected = []
      this.data = []

      this.getRecords = () => {
        this.promise = crud.list().then(data => {
          this.data = data
        })
      }

      this.getRecords()      
    }

  })
}

module.exports = list