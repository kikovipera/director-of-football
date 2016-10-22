/* global Vue */
/* eslint-disable no-unused-vars */
Vue.config.devtools = false

require('./js/core')
require('./js/titlebar')
require('./js/sidebar')
require('./js/view')
require('./js/debug')

var vm = new Vue({
  el: '#app',
  data: {
    launchDate: new Date()
  },
  methods: {
    init: function () {
      console.log('App initialised')
    }
  },
  mounted: function () {
    this.$el.style.visibility = 'visible'
    this.init()
  }
})
