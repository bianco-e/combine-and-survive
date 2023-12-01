import cardsData from './cards.js'
import Stats from './components/stats/index.js'
import Toaster from './components/toaster/index.js'
import Card from './components/card/index.js'
import Modal from './components/modal/index.js'

window.addEventListener('load', () => {
  const person = document.querySelector('.person')
  Stats.initiate()
  Card.addListeners(person)
  const initialCards = cardsData.filter(card => card.isInitial)
  initialCards.forEach(card => addCard(card, 'initial-board'))
  Stats.updateDiscoveries()
  setInitialIntervals()
  document.getElementById('instructions-button').addEventListener('click', Modal.showInstructions)
})

function addCard(newCard, boardId) {
  Card.create(newCard, boardId)
  Stats.updateDiscoveries()
}

function setInitialIntervals() {
  window.thirstIntervalId = setInterval(() => {
    const currentThirst = parseInt(document.getElementById('gem-thirst-offset').innerText)
    if (currentThirst <= 15) {
      Toaster.display('You are about to die of thirst, drink something!', 'error')
    }
    Stats.decrease('thirst', 5)
  }, 12000)

  window.animalIntervalId = setInterval(() => {
    const animalCard = cardsData.find(card => card.isAnimal)
    const animalCardElement = document.getElementById(`card-${animalCard.id}`)
    const currentDiscoveries = document.querySelectorAll('#discoveries-board div.card').length
    if (Boolean(animalCardElement) || !currentDiscoveries) return
    addCard(animalCard, 'discoveries-board')
    Toaster.display(`A wild ${animalCard.name} has just appeared`, 'success')
  }, 25000)
}