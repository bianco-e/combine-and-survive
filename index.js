import cardsData from './cards.js'
import Stats from './components/stats/index.js'
import Toaster from './components/toaster/index.js'
import Card from './components/card/index.js'

window.addEventListener('load', () => {
  const person = document.querySelector('.person')
  Stats.initiate()
  Card.addListeners(person)
  const initialCards = cardsData.filter(card => card.isInitial)
  initialCards.forEach(card => addCard(card, 'initial-board'))
  Stats.updateDiscoveries()
  setInitialIntervals()
})

function addCard(newCard, boardId) {
  Card.create(newCard, boardId)
  Stats.updateDiscoveries(cardsData)
}

function setInitialIntervals() {
  window.thirstIntervalId = setInterval(() => {
    Stats.decrease('thirst', 5)
  }, 15000)

  window.animalIntervalId = setInterval(() => {
    const animalCard = cardsData.find(card => card.isAnimal)
    const animalCardElement = document.getElementById(`card-${animalCard.id}`)
    if (Boolean(animalCardElement)) return
    addCard(animalCard, 'discoveries-board')
    Toaster.display(`A wild ${animalCard.name} has just appeared`, 'success')
  }, 20000)
}