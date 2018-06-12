# Project App

## Environment Variables

 - `NODE_PORT` - Default: 80.
 - `JWT_SECRET` - Required.
 
## CRUD structure

Projects deriving from this framework use CRUD utilities for much of the
functionality. Often times, the majority of features can be implemented with
the same few functions: Create, Read, Update, Delete (and extended functions
such as List, Autocomplete, Undelete, etc.) of entities. So these concepts have
been built into a few tools so that they can be reused with the minimum amount
of code in the derived project.

What follows are the few steps necessary to take advantage of these utilites
for a given entity. The library takes many liberties with naming resources.
Entity names are automatically converted to several different cases. We'll
refer to the example entity as `Wild Berry`, but it will automatically be
converted to the other cases as needed. As necessary, these cases can be
overridden, but it is only required to specify one in each case (generally
`camelCase` will do).

#### Example cases:

| Case Parameter | Example         |
|----------------|-----------------|
| `titleCase`    | `Wild Berry`    |
| `titlePlural`  | `Wild Berries`  |
| `pascalCase`   | `WildBerry`     |
| `pascalPlural` | `WildBerries`   |
| `camelCase`    | `wildBerry`     |
| `camelPlural`  | `wildBerries`   |
| `paramCase`    | `wild-berry`    |
| `paramPlural`  | `wild-berries`  |

### Creating Wild Berries

1. Create `lib/database/wild-berry.js`

  - Filename is in singular `param-case`.
  - Model variable is in singular `PascalCase`.
  - Model fields are in `camelCase`.
  - See [Sequelize - Model Definitions](http://docs.sequelizejs.com/manual/tutorial/models-definition.html) for more info.

    ```javascript
    const Sequelize = require('sequelize')
    const sequelize = require('./sequelize')

    const WildBerry = sequelize.define('wildBerry', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      name: Sequelize.STRING
    }, {
      paranoid: true
    })

    module.exports = WildBerry
    ```

2. Export `WildBerry` in `lib/database/index.js`

  - Exported models are in singular `PascalCase`.
  - `module.exports` includes exports from the framework.

    ```javascript
    const {database} = require('@alancnet/material-framework/server')
    const WildBerry = require('./wild-berry')

    module.exports = Object.assign(database, {
      WildBerry
    })
    ```

3. Create CRUD API controller in `lib/controllers/wild-berry.js`

  - Filename is in singular `param-case`.
  - `controller` accepts case parameter overrides, otherwise they will derive from `Type.name`.

    ```javascript
    const { controller } = require('@alancnet/material-framework/lib/crud')
    const { WildBerry } = require('../database')

    module.exports = controller({
      Type: WildBerry
    })
    ```

4. Export `wildBerry` in `lib/controllers/index.js`

  - Unlike in `lib/database/index.js`, the exported variable name is singular `camelCase`.
  - `module.exports` includes exports from the framework.
  - `controllers` is always aliased as `C`.
  - Controllers are exported on the framework library also.

    ```javascript
    const { controllers: C } = require('@alancnet/material-framework/server')
    const wildBerry = require('./wild-berry')

    module.exports = Object.assign(C, {
      wildBerry
    })
    ```

5. Add CRUD API routes in `lib/routes.js'

  - `controllers` is always aliased as `C`.
  - `routes` (aliased as `crudRoutes`) is imported from the framework.
  - `crudRoutes` accepts case parameter overrides, otherwise they will be derived from `camelName`.

    ```javascript
    const C = require('./controllers')
    const { routes:crudRoutes } = require('@alancnet/material-framework/lib/crud')

    module.exports = app => {
      crudRoutes({ app, controller: C.wildBerry, camelName: 'wildBerry' })
    }
    ```

6. Create CRUD pages in `app/components/wild-berry-pages.js`

  - `pages` is imported from the framework.
  - `pages` accepts case parameter overrides
  - Columns accept many options. See [TODO: Columns](#columns)
  - `pages` accept a `layout` property for simple layout definitions. See [TODO: Layout](#layout)

    ```javascript
    const { pages } = require('@alancnet/material-framework/app/crud')

    pages({
      camelName: 'wildBerry',
      columns: [
        { camelName: 'name' }
      ]
    })
    ````
7. Import CRUD pages in `app/components/index.js`

    ```javascript
    require('./wild-berry-pages')
    ```

8. Add CRUD page routes in `app/routes/js`

  - `crudRoutes` is already exposed on $routeProvider.

    ```javascript
    module.exports = function($routeProvider) {
      $routeProvider.crudRoutes({ camelName: 'wildBerry' })
    }
    ```

9. Find an appropriate icon in the included libraries, or add an SVG to `app/assets/wild-berry.svg`

  - Check `node_modules/@alancnet/icomoon-svg`
  - Check `node_modules/@alancnet/material-design-icons`
  - Prefer monochrome SVGs with no fill color.

10. Export the icon in `app/assets/index.js`

  - Assets are exported on the framework library also.
  - This file is loaded before all others because the overrides are used early on in the application lifecycle.

    ```javascript
    const assets = require('@alancnet/material-framework/app/assets')
    module.exports = Object.assign(assets, {
      wildBerryIcon: require('./wild-berry.svg')
    })
    ```

11. Add links to the side nav in `app/components/user-area-nav.js`

  - Import the icon from assets.
  - Link to the plural param-cased `/wild-berries`.
  - Use Title Case for the link text.

    ```javascript
    const app = require('../app')
    const { wildBerryIcon } = require('../assets')

    app.component('appUserAreaNav', {
      template: html`
        <md-menu-item>
          <md-button ng-href="/wild-berries">
            <md-icon md-svg-icon="${wildBerryIcon}"></md-icon>
            Wild Berries
          </md-button>
        </md-menu-item>
      `
    })
    ```
