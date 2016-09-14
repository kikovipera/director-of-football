const app = require('electron').app
const fs = require('fs')
const path = require('path')

module.exports = {
  data: {
    width: 1024,
    height: 768,
    maximized: false
  },

  get width () {
    return module.exports.data.width
  },
  get height () {
    return module.exports.data.height
  },
  get maximized () {
    return module.exports.data.maximized
  },

  path: path.join(app.getPath('userData'), 'settings.json'),

  load: () => {
    try {
      module.exports.data = JSON.parse(fs.readFileSync(module.exports.path, 'utf8'))
    } catch (e) {
      // Simply use default data
    }
  },

  save: () => {
    try {
      fs.writeFileSync(module.exports.path, JSON.stringify(module.exports.data), 'utf8')
    } catch (e) {
      throw new Error(e)
    }
  },

  onResize: (e) => {
    let win = e.sender
    module.exports.data.maximized = win.isMaximized()
    if (module.exports.data.maximized !== true) {
      let size = win.getSize()
      module.exports.data.width = size[0]
      module.exports.data.height = size[1]
    }
  }
}

/*

function getUserSettings () {
  let filePath = path.join(app.getPath('userData'), 'settings.json')
  console.log('Filepath = ' + filePath)
  try {
    let file = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(file)
  } catch (e) {
    console.log('settings.json not found.')
  }
  return {
    width: 1024,
    height: 768
  }
}

function saveUserSettings () {
  let filePath = path.join(app.getPath('userData'), 'settings.json')
  try {
    fs.writeFileSync(filePath, JSON.stringify(userSettings), 'utf8')
  } catch (e) {
    console.log('Could not save setting.json.')
  }
}

*/
