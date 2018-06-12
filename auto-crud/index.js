/* Example */
/*

const { register, Sequelize } = require('material-framework/auto-crud')

register({
  camelName: 'actor',
  iconAsset: 'userIcon',
  schema: {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    name: Sequelize.STRING
  },
  options: {
    paranoid: true
  },
  columns: [
    { camelName: 'name' }
  ],
  layout: [
    {
      section: 'Details',
      rows: [
        [ 'name' ]
      ]
    }
  ]
})

*/