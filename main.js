// Core node modules
const electron = require('electron')
const path = require('path')

// Electron components
const BrowserWindow = electron.BrowserWindow

// Electron modules
const app = electron.app
const ipc = electron.ipcMain

// Custom modules
const settings = require('./modules/settings')

// Objects
let screen

function createScreen () {
  // Create & Show the screen
  screen = new BrowserWindow({
    width: settings.width,
    height: settings.height,
    title: app.getName(),
    show: false
  })
  screen.loadURL(path.join('file://', __dirname, '/screens/splash.html'))

  screen.once('ready-to-show', () => {
    screen.show()
    if (settings.maximized) screen.maximize()
  })

  screen.on('resize', (e) => {
    settings.onResize(e)
  })

  screen.on('maximize', (e) => {
    settings.onResize(e)
  })

  screen.on('unmaximize', (e) => {
    settings.onResize(e)
  })

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
  console.log(settings.width, settings.height)
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
/*

  mainWindow.on('resize', windowEvent)
  mainWindow.on('maximize', windowEvent)
  mainWindow.on('unmaximize', windowEvent)

  if (debug) {
    mainWindow.webContents.openDevTools()
    require('devtron')
  }
}

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
