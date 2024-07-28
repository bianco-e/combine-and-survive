import cardsData from './cards.js'
import Stats from './components/stats/index.js'
import Toaster from './components/toaster/index.js'
import Card from './components/card/index.js'
import Modal from './components/modal/index.js'
import { polyfill } from 'mobile-drag-drop'
import i18n from './i18n.js'
import { LOW_THIRST_WARNING, STAT_CHANGE_SM, LANG } from './constants.js'

window.addEventListener('load', () => {
  polyfill()
  Stats.initiate()
  Card.create({ ...cardsData[0], className: 'person' }, 'person-board', { increaseDiscoveries: false, isInteractive: true }) //create Person
  const initialCards = cardsData.filter(card => card.isInitial && !card.isPerson)
  initialCards.forEach(card => Card.create(card, 'initial-board', { increaseDiscoveries: false, isInteractive: true }))
  setInitialIntervals()
  document.getElementById('badges-button').addEventListener('click', Modal.showBadges)
  document.getElementById('instructions-button').addEventListener('click', Modal.showInstructions)
})

function setInitialIntervals() {
  window.thirstIntervalId = setInterval(() => {
    const currentThirst = parseInt(document.getElementById('gem-thirst-offset').innerText)
    if (currentThirst <= LOW_THIRST_WARNING) {
      Toaster.display(i18n.thirstDeath[LANG], 'error')
    }
    Stats.decrease('thirst', STAT_CHANGE_SM)
  }, 13000)

  window.animalIntervalId = setInterval(() => {
    const animalCard = cardsData.find(card => card.isAnimal)
    const animalCardElement = document.getElementById(`card-${animalCard.id}`)
    const currentDiscoveries = document.querySelectorAll('#discoveries-board div.card').length
    if (Boolean(animalCardElement) || !currentDiscoveries) return
    Card.create(animalCard, 'discoveries-board')
    Toaster.display(i18n.wildBull[LANG], 'success')
  }, 25000)
}
