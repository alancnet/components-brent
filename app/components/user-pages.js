const crudPages = require('./crud-pages')

crudPages({
  typeName: 'User',
  typePlural: 'Users',
  camelName: 'user',
  camelPlural: 'users',
  snakeName: 'user',
  snakePlural: 'users',
  apiPrefix: '/api/users',
  columns: [
    {
      fieldName: 'Name',
      camelName: 'name',
      header: html`<th md-column md-order-by="nameToLower"><span>Name</span></th>`,
      cell: html`<td md-cell>{{user.name}}</td>`
    },
    {
      fieldName: 'Email',
      camelName: 'email'
    },
    {
      fieldName: 'Password',
      camelName: 'password',
      type: 'password'
    }
  ]
})