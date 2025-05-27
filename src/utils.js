import cardsData from './cards.js'
import Stats from './components/stats/index.js'
import Toaster from './components/toaster/index.js'
import Card from './components/card/index.js'
import i18n from './i18n.js'
import { LOW_THIRST_WARNING, STAT_CHANGE_SM } from './constants.js'
import Modal from './components/modal/index.js'

// helpers
export function capitalize(string) {
  return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase()
}

export function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false
  const sortedArr1 = arr1.slice().sort()
  const sortedArr2 = arr2.slice().sort()
  return !sortedArr1.some((n, idx) => n !== sortedArr2[idx])
}

// game logic related
export const addSourceCardToBoard = (cardId, messageOnAdd) => {
  const sourceCard = cardsData.find(card => card.id === cardId)
  const sourceCardElement = document.getElementById(`card-${cardId}`)
  if (Boolean(sourceCardElement)) return
  Card.create(sourceCard, 'sources-board')
  Toaster.display(messageOnAdd, 'success')
}

export const addWildAnimalToBoard = (animalId, messageOnAdd, cardIdToRemove) => {
  const animalCard = cardsData.find(card => card.id === animalId)
  const animalCardElement = document.getElementById(`card-${animalId}`)
  const currentDiscoveries = document.querySelectorAll('#discoveries-board div.card').length
  if (Boolean(animalCardElement) || !currentDiscoveries) return
  Card.create(animalCard, 'discoveries-board')
  if (cardIdToRemove) {
    Card.remove(cardIdToRemove, 'discoveries-board')
  }
  Toaster.display(messageOnAdd, 'success')
}

export const setInitialBoard = () => {
  const initialBoard = `
    <div id="board-left-top-container" class="board-buttons-container discoveries"></div>

    <div id="board-right-top-container" class="board-buttons-container badges-instructions">
      <button class="board-button" id="badges-button">🏅</button>
      <button class="board-button" id="instructions-button">❔</button>
    </div>

    <div class="content-wrapper">
      <div id="person-board" class="board"></div>
      <div id="sources-board" class="board"></div>
      <div id="discoveries-board" class="board"></div>
    </div>

    <div id="toasters-wrapper"></div>
    <dialog id="modal" class="modal"></dialog>

    <div id="stats" class="stats-container"></div>
    <script src="./index.js" type="module"></script>
  `
  document.body.innerHTML = initialBoard
}

export function setInitialIntervalsAndButtonsOnClick() {
  document.getElementById('badges-button').addEventListener('click', Modal.showBadges)
  document.getElementById('instructions-button').addEventListener('click', Modal.showInstructions)

  window.thirstIntervalId = setInterval(() => {
    const currentThirst = parseInt(document.getElementById('gem-thirst-offset').innerText)
    if (currentThirst <= LOW_THIRST_WARNING) {
      Toaster.display(i18n.t('thirstDeath'), 'error')
    }
    Stats.decrease('thirst', STAT_CHANGE_SM)
  }, 13000)

  window.animalIntervalId = setInterval(() => {
    const BULL_CARD_ID = 26
    addWildAnimalToBoard(BULL_CARD_ID, i18n.t('wildBull'))
  }, 26000)
}