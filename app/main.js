const chalk = require('chalk')
const electron = require('electron')

const BrowserWindow = electron.BrowserWindow

const app = electron.app

let splashWindow

function ready () {
  // Initial log messages
  console.log(chalk.green.bold('%s v%s') + chalk.black(' running ') + chalk.cyan.bold('Electron v%s'), app.getName(), app.getVersion(), process.versions.electron)
  // Create initialWindow
  createInitialWindow()
}

function createInitialWindow () {
  splashWindow = new BrowserWindow({width: 800, height: 600, title: app.getName(), show: false})

  // Window events
  splashWindow.on('ready-to-show', () => {
    splashWindow.show()
  })
  splashWindow.on('closed', () => {
    splashWindow = null
  })

  splashWindow.loadURL('file://' + __dirname + '/windows/splash/splash.html')
}

app.on('ready', ready)
