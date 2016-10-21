let newGameButton = document.getElementById('new-game-button')
let loadGameButton = document.getElementById('load-game-button')
let settingsButton = document.getElementById('settings-button')

let newGameView = document.getElementById('new-game-view')
let loadGameView = document.getElementById('load-game-view')
let settingsView = document.getElementById('settings-view')

newGameButton.addEventListener('click', (e) => {
  newGameButton.classList.add('active')
  loadGameButton.classList.remove('active')
  settingsButton.classList.remove('active')
  //
  newGameView.style.display = 'block'
  loadGameView.style.display = 'none'
  settingsView.style.display = 'none'
})

loadGameButton.addEventListener('click', (e) => {
  newGameButton.classList.remove('active')
  loadGameButton.classList.add('active')
  settingsButton.classList.remove('active')
  //
  newGameView.style.display = 'none'
  loadGameView.style.display = 'block'
  settingsView.style.display = 'none'
})

settingsButton.addEventListener('click', (e) => {
  newGameButton.classList.remove('active')
  loadGameButton.classList.remove('active')
  settingsButton.classList.add('active')
  //
  newGameView.style.display = 'none'
  loadGameView.style.display = 'none'
  settingsView.style.display = 'block'
})