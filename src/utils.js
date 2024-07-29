import cardsData from './cards.js'
import Card from './components/card/index.js'
import Toaster from './components/toaster/index.js'

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
export const addWildAnimalToBoard = (animalId, messageOnAdd, cardIdToRemove) => {
  const animalCard = cardsData.find(card => card.id === animalId)
  const animalCardElement = document.getElementById(`card-${animalCard.id}`)
  const currentDiscoveries = document.querySelectorAll('#discoveries-board div.card').length
  if (Boolean(animalCardElement) || !currentDiscoveries) return
  Card.create(animalCard, 'discoveries-board')
  if (cardIdToRemove) {
    Card.remove(cardIdToRemove, 'discoveries-board')
  }
  Toaster.display(messageOnAdd, 'success')
}