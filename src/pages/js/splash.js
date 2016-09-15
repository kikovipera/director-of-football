const $ = require('jquery')
const ipc = require('electron').ipcRenderer

$('#text-button').on('click', (e) => {
  ipc.send('console-log', $('#text-field').val())
})
