// Core node modules
const electron = require('electron')
const path = require('path')

// Electron components
const BrowserWindow = electron.BrowserWindow

// Electron modules
const app = electron.app
const ipc = electron.ipcMain

// Custom modules
const settings = require('./src/modules/settings')

// Objects
let screen

function createScreen () {
  // Create & Show the screen
  screen = new BrowserWindow({
    width: settings.width,
    height: settings.height,
    title: app.getName(),
    show: false,
    frame: true
  })
  screen.loadURL(path.join('file://', __dirname, '/src/pages/splash.html'))

  screen.once('ready-to-show', () => {
    screen.show()
    if (settings.maximized) screen.maximize()
    // Run scripts now window has shown
    require('./src/scripts/menu')
  })

  settings.events(screen)

  screen.on('close', () => {
    screen = null
  })

  screen.webContents.on('crashed', () => {
    screen.close()
  })

  screen.on('unresponsive', () => {
    screen.close()
  })
}

process.on('uncaughtException', (err) => {
  console.log('Something went wrong!\n> ' + err)
  if (app !== null) app.quit()
})

// Electron is ready to rock!
app.on('ready', () => {
  // Load user settings file
  settings.load()
  // Show the screen
  createScreen()
})

app.on('activate', () => {
  if (screen === null) createScreen()
})

app.on('window-all-closed', () => {
  settings.save()
  if (process.platform !== 'darwin') app.quit()
})

ipc.on('console-log', (e, message) => {
  console.log(message)
})
