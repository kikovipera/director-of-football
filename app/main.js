const chalk = require('chalk')
const electron = require('electron')
// const argv = require('yargs').argv

const BrowserWindow = electron.BrowserWindow

const app = electron.app

var win

function ready () {
  // Initial log messages
  console.log(chalk.green.bold('%s v%s') + chalk.black(' running ') + chalk.cyan.bold('Electron v%s'), app.getName(), app.getVersion(), process.versions.electron)
  // Create initialWindow
  createWindow()
}

function createWindow () {
  win = new BrowserWindow({width: 1600, minWidth: 400, height: 850, minHeight: 400, title: app.getName(), show: false, frame: false, backgroundColor: '#57d5af'})

  // Window events
  win.once('ready-to-show', () => {
    win.show()
  })
  win.on('closed', () => {
    win = null
  })

  win.loadURL('file://' + __dirname + '/window/index.html')
}

app.on('ready', ready)
