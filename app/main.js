const argv = require('yargs').argv
const electron = require('electron')
const path = require('path')

const BrowserWindow = electron.BrowserWindow

const app = electron.app

let initialWindow

function ready () {
  // Initial log messages
  console.log(app.getName() + ' v' + app.getVersion() + '\nElectron v' + process.versions.electron)
  if (argv.debug) console.log('DEBUG MODE')
  // Create initialWindow
  createInitialWindow()
}

function createInitialWindow () {
  initialWindow = new BrowserWindow({width: 800, height: 600, title: app.getName(), show: false})

  // Window events
  initialWindow.on('ready-to-show', () => {
    initialWindow.show()
  })
  initialWindow.on('closed', () => {
    initialWindow = null
  })

  // Load URL
  initialWindow.loadURL(path.join('file://', __dirname, '/windows/initial/index.html'))
}

app.on('ready', ready)
