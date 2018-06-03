# CRUD Pages

This utility will create standard pages for listing, creating, reading, updating, and deleting standard entities.

```javascript
crudPages({
  typeName,         // string (required): MyEntity
  typePlural,       // string (optional): MyEntities
  camelName,        // string (optional): myEntity
  camelPlural,      // string (optional): myEntities
  paramName,        // string (optional): my-entity
  paramPlural,      // string (optional): my-entities
  apiPrefix,        // string (optional): /api/my-entities
  columns: [
    {
      fieldName:    // string (required): Mailing Address
      camelName:    // string (optional): mailingAddress
    }
  ]
})
```
