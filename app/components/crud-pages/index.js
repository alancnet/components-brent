const app = require('../../app')
const { pascal, camel, param, title } = require('change-case')
const plural = require('plural')
const list = require('./list')
const details = require('./details')
const trash = require('./trash')

/** @define CrudPagesOptions
 * @property {string} titleName Type name in Title Case. This is used for labels like "New {Title Name}"
 * @property {string} titlePlural Plural type name in Title Case. This is used for labels like "View All {Title Plurals}"
 * @property {string} pascalName Type name in PascalCase. This is used for Class definitions like "app{PascalName}Page"
 * @property {string} pascalPlural Plural type name in PascalCase. This is used for Class definitions like "app{PascalPlural}List"
 * @property {string} camelName Type name in camelCase. This is used for referencing models, like "model.{camelName}"
 * @property {string} camelPlural Plural type name in camelCase.
 * @property {string} paramName Type name in param-case.
 * @property {string} paramPlural Plural type name in param-case. This is used for urls, like "/api/{param-plural}"
 * @property {string} apiPrefix API url path prefix. Default: /api/{param-plural}
 * @property {string} appPrefix APP url path prefix. Default: /{param-plural}
 * @property {CrudColumnOptions[]} columns
 */

/** @define CrudColumnOptions
 * @property {string} titleName Field name in Title Case. This is used for field labels.
 * @property {string} camelName Field name in camelCase. This is used to reference data in the model.
 * @property {string} header HTML template for the list table header.
 * @property {string} cell HTML template for the list table cell
 * @property {string} type Field type. Can be applied to <input type="{type}" /> or used to determine a renderer.
 * @property {boolean} inList Default: true. Includes column in list page.
 */

/**
 * @param {CrudPagesOptions} opts 
 */
const crudPages = (opts) => {
  if (!opts.pascalName) opts.pascalName = pascal(opts.titleName || opts.camelName || opts.paramName || '')
  if (!opts.pascalName) throw new Error('pascalName is required')
  if (opts.pascalName !== pascal(opts.pascalName)) throw new Error('pascalName should be PascalCased')
  if (!opts.pascalPlural) opts.pascalPlural = plural(opts.pascalName)
  if (opts.pascalPlural !== pascal(opts.pascalPlural)) throw new Error('pascalPlural should be PascalCased')
  if (!opts.titleName) opts.titleName = title(opts.pascalName)
  if (!opts.titlePlural) opts.titlePlural = plural(opts.titleName)
  if (!opts.camelName) opts.camelName = camel(opts.pascalName)
  if (opts.camelName !== camel(opts.camelName)) throw new Error('camelName should be camelCased')
  if (!opts.camelPlural) opts.camelPlural = plural(opts.camelName)
  if (opts.camelPlural !== camel(opts.camelPlural)) throw new Error('camelPlural should be camelCased')
  if (!opts.paramName) opts.paramName = param(opts.pascalName)
  if (opts.paramName !== param(opts.paramName)) throw new Error('paramName should be param-cased')
  if (!opts.paramPlural) opts.paramPlural = plural(opts.paramName)
  if (opts.paramPlural !== param(opts.paramPlural)) throw new Error('paramPlural should be param-cased')
  if (!opts.apiPrefix) opts.apiPrefix = `/api/${opts.paramPlural}`
  if (!opts.appPrefix) opts.appPrefix = `/${opts.paramPlural}`
  if (!opts.listComponentName) opts.listComponentName = `app${opts.pascalPlural}List`
  if (opts.listComponentName !== camel(opts.listComponentName)) throw new Error('listComponentName should be camelCased')
  if (!opts.listComponentTag) opts.listComponentTag = `app-${opts.paramName}-list`
  if (opts.listComponentTag !== param(opts.listComponentTag)) throw new Error('listComponentTag should be param-cased')
  if (!opts.listPageComponentName) opts.listPageComponentName = `app${opts.pascalPlural}Page`
  if (opts.listPageComponentName !== camel(opts.listPageComponentName)) throw new Error('listPageComponentName should be camelCased')
  if (!opts.listPageComponentTag) opts.listPageComponentTag = `app-${opts.paramPlural}-page`
  if (opts.listPageComponentTag !== param(opts.listPageComponentTag)) throw new Error('listPageComponentTag should be param-cased')
  
  if (!opts.columns) throw new Error('Columns are required')
  opts.columns.forEach(col => {
    if (!col.camelName) col.camelName = camel(opts.titleName)
    if (!col.camelName) throw new Error('camelName is required')
    if (col.camelName !== camel(col.camelName)) throw new Error('column.camelName should be camelCased')
    if (!col.titleName) col.titleName = title(col.camelName)
    if (col.type === undefined) col.type = 'text'
    if (col.inList === undefined) col.inList = true
  })

  list(opts)
  details(opts)
  trash(opts)
}


  // TODO: Create Read Update Delete pages...


module.exports = crudPages