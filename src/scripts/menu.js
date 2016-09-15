const Menu = require('electron').Menu

const template = [
  {
    label: 'File',
    submenu: [
      {
        role: 'minimize'
      }, {
        type: 'separator'
      }, {
        label: 'Close Window',
        role: 'close'
      }, {
        label: 'Quit',
        role: 'quit'
      }
    ]
  }, {
    label: 'View'
  }
]

const appMenu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(appMenu)
