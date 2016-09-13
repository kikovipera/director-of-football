const electron = require('electron')
const path = require('path')

const BrowserWindow = electron.BrowserWindow

const app = electron.app

const debug = /--debug/.test(process.argv[2])

let mainWindow = null

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    title: app.getName()
  })
  mainWindow.loadURL(path.join('file://', __dirname, '/views/index.html'))

  if (debug) {
    mainWindow.webContents.openDevTools()
    require('devtron').install()
  }
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
