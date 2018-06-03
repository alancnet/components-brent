const app = require('../app')

app.component('appTestPage', {
  template: html`
  <h2>Material Buttons</h2>
  <p>
    <md-button class="md-primary">Hello World</md-button>
    <md-button class="md-accent">Hello World</md-button>
    <md-button class="md-warn">Hello World</md-button>
    <md-button class="">Hello World</md-button>
  </p>
  `,
  controller: function() {
  }
})
