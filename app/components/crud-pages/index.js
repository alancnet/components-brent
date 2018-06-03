const app = require('../../app')
const { pascal, camel, param } = require('change-case')
const plural = require('plural')
const list = require('./list')
const details = require('./details')

const crudPages = ({
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
  if (!typeName) throw new Error('typeName is required')
  if (typeName !== pascal(typeName)) throw new Error('typeName should be PascalCased')
  if (!typePlural) typePlural = plural(typeName)
  if (typePlural !== pascal(typePlural)) throw new Error('typePlural should be PascalCased')
  if (!camelName) camelName = camel(typeName)
  if (camelName !== camel(camelName)) throw new Error('camelName should be camelCased')
  if (!camelPlural) camelPlural = plural(camelName)
  if (camelPlural !== camel(camelPlural)) throw new Error('camelPlural should be camelCased')
  if (!paramName) paramName = param(typeName)
  if (paramName !== param(paramName)) throw new Error('paramName should be param-cased')
  if (!paramPlural) paramPlural = plural(paramName)
  if (paramPlural !== param(paramPlural)) throw new Error('paramPlural should be param-cased')
  if (!apiPrefix) apiPrefix = `/api/${paramPlural}`
  if (!appPrefix) appPrefix = `/${paramPlural}`

  columns = columns.map(column => Object.assign({}, column, {
    camelName: column.camelName || camel(column.fieldName)
  }))

  const listComponentName = `app${typePlural}List`
  const listComponentTag = `app-${paramName}-list`
  const listPageComponentName = `app${typePlural}Page`
  const listPageComponentTag = `app-${paramPlural}-page`

  const args = { typeName, typePlural, camelName, camelPlural, paramName, paramPlural, apiPrefix, appPrefix, columns }

  list(args)
  details(args)
}


  // TODO: Create Read Update Delete pages...


module.exports = crudPages