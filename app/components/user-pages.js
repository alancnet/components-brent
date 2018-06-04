const crudPages = require('./crud-pages')

crudPages({
  titleName: 'User',
  titlePlural: 'Users',
  pascalName: 'User',
  pascalPlural: 'Users',
  camelName: 'user',
  camelPlural: 'users',
  snakeName: 'user',
  snakePlural: 'users',
  apiPrefix: '/api/users',
  columns: [
    {
      titleName: 'Name',
      camelName: 'name',
      header: html`<th md-column md-order-by="nameToLower"><span>Name</span></th>`,
      cell: html`<td md-cell>{{user.name}}</td>`
    },
    {
      titleName: 'Email',
      camelName: 'email'
    },
    {
      titleName: 'Password',
      camelName: 'password',
      type: 'password',
      inList: false
    }
  ]
})