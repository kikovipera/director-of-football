/* global Vue */
/* eslint-disable no-unused-vars */
Vue.config.devtools = false

const electron = require('electron')

const app = electron.remote.app
const win = electron.remote.getCurrentWindow()
const dialog = electron.remote.dialog

// JS files
require('./js/titlebar')
require('./js/sidebar')
require('./js/view')
require('./js/debug')

// Views
var SplashView = require('./views/splash')

var vm = new Vue({
  el: '#app',
  data: {
    launchDate: new Date()
  },
  mounted: function () {
    this.$el.style.visibility = 'visible'
  }
})
