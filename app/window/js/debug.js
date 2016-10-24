/* global Vue */
(function () {
  const electron = require('electron')
  const app = electron.remote.app
  const win = electron.remote.getCurrentWindow()

  var template = `
  <div id="app-debug">
    <button @click="toggleDevTools" title="Toggle DevTools"><i class="fa fa-terminal"></i></button>
    <button @click="reload" title="Reload"><i class="fa fa-refresh"></i></button>
    <button @click="restart" title="Restart"><i class="fa fa-repeat"></i></button>
  </div>
  `

  Vue.component('app-debug', {
    template: template,
    methods: {
      toggleDevTools: function () {
        win.toggleDevTools()
      },
      reload: function () {
        win.reload()
      },
      restart: function () {
        app.relaunch()
        app.exit()
      }
    }
  })
})()
