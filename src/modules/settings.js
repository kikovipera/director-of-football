const app = require('electron').app
const fs = require('fs')
const path = require('path')

let settings = {
  data: {
    width: 1024,
    height: 768,
    maximized: false
  },
  path: path.join(app.getPath('userData'), 'settings.json'),

  // Getters
  get width () {
    return settings.data.width
  },
  get height () {
    return settings.data.height
  },
  get maximized () {
    return settings.data.maximized
  },

  // Functions
  load: () => {
    try {
      settings.data = JSON.parse(fs.readFileSync(settings.path, 'utf8'))
    } catch (e) {

    }
  },

  save: () => {
    try {
      fs.writeFileSync(settings.path, JSON.stringify(settings.data), 'utf8')
    } catch (e) {
      throw new Error(e)
    }
  },

  events: (win) => {
    let f = () => {
      settings.data.maximized = win.isMaximized()
      if (settings.data.maximized !== true) {
        let size = win.getSize()
        settings.data.width = size[0]
        settings.data.height = size[1]
      }
    }
    win.on('resize', f)
    win.on('maximize', f)
    win.on('unmaximize', f)
  }
}

module.exports = settings
