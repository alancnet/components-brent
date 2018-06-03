const { pascal, camel, param } = require('change-case')
const plural = require('plural')
const asyncHandler = require('express-async-handler')

module.exports = ({
  app,
  controller,
  typeName,
  typePlural,
  camelName,
  camelPlural,
  paramName,
  paramPlural,
  apiPrefix  
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
  if (paramName !== camel(paramName)) throw new Error('paramName should be param-cased')
  if (!paramPlural) paramPlural = plural(paramName)
  if (paramPlural !== camel(paramPlural)) throw new Error('paramPlural should be param-cased')
  if (apiPrefix) apiPrefix = `/${paramPlural}`

  if (controller.list) app.get(`/api/${paramPlural}`, asyncHandler(controller.list))
  if (controller.create) app.post(`/api/${paramPlural}`, asyncHandler(controller.create))
  if (controller.read) app.get(`/api/${paramPlural}/:id`, asyncHandler(controller.read))
  if (controller.update) app.put(`/api/${paramPlural}/:id`, asyncHandler(controller.update))
  if (controller.delete) app.delete(`/api/${paramPlural}/:id`, asyncHandler(controller.delete))
}