/* global Vue */
(function () {
  const electron = require('electron')

  const app = electron.remote.app
  const win = electron.remote.getCurrentWindow()

  var template = `
  <div id="app-titlebar">
    <h1><i class="fa fa-futbol-o"></i> Director of Football</h1>
    <button @click="minimize" title="Minimize"><i class="fa fa-fw fa-minus"></i></button>
    <button @click="maximize" :title="isMaximized ? 'Unmaximize' : 'Maximize'"><i class="fa fa-fw" v-bind:class="[ isMaximized ? 'fa-clone' : 'fa-square-o' ]"></i></button>
    <button @click="quit" class="quit" title="Quit"><i class="fa fa-fw fa-times"></i></button>
  </div>
  `

  Vue.component('app-titlebar', {
    template: template,
    data: function () {
      return {
        isMaximized: win.isMaximized()
      }
    },
    created: function () {
      win.on('maximize', () => { this.isMaximized = true })
      win.on('unmaximize', () => { this.isMaximized = false })
    },
    methods: {
      minimize: function () {
        win.minimize()
      },
      maximize: function () {
        if (this.isMaximized) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      },
      quit: function () {
        app.quit()
      }
    }
  })
})()
