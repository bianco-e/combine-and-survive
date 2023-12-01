import cardsData from '../../cards.js'
import combinations from '../../combinations.js'
import { areArraysEqual } from '../../utils.js'
import Stats from '../stats/index.js'
import Toaster from '../toaster/index.js'

export default class Card {
  static addListeners(cardElement) {
    cardElement.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', getCurrentCardId(e)))
    cardElement.addEventListener('dragover', e => e.preventDefault())
    cardElement.addEventListener('dragenter', e => e.preventDefault())
    cardElement.addEventListener('drop', onDrop)
  }

  static applyEffects(combination) {
    if (combination.message) {
      Toaster.display(combination.message.content, combination.message.type)
    }
    if (combination.increase) {
      Object.entries(combination.increase).forEach(([stat, amount]) => Stats.increase(stat, amount))
    }
    if (combination.decrease) {
      Object.entries(combination.decrease).forEach(([stat, amount]) => Stats.decrease(stat, amount))
    }
    if (combination.consumes.length) {
      combination.consumes.forEach(consumed => {
        this.remove(consumed, 'discoveries-board')
      })
    }
  }

  static remove(id, boardId) {
    const board = document.getElementById(boardId)
    const cardToRemove = document.getElementById(`card-${id}`)
    board.removeChild(cardToRemove)
  }

  static create({ id, name, image }, boardId) {
    const newCardElement = document.createElement('div')
    newCardElement.setAttribute('id', `card-${id}`)
    newCardElement.setAttribute('draggable', 'true')
    newCardElement.classList.add('card', 'new-card')
    const newCardName = document.createElement('p')
    newCardName.innerText = name
    newCardName.setAttribute('draggable', 'false')
    newCardElement.appendChild(newCardName)
    const newCardImg = document.createElement('img')
    newCardImg.setAttribute('src', image)
    newCardImg.setAttribute('alt', name)
    newCardImg.setAttribute('draggable', 'false')
    newCardElement.appendChild(newCardImg)

    this.addListeners(newCardElement)
    const board = document.getElementById(boardId)
    board.appendChild(newCardElement)
    Stats.updateDiscoveries()
    setTimeout(() => {
      newCardElement.classList.remove('new-card')
    }, 300)
  }
}

function extractNumberFromId(id) {
  const match = id.match(/^card-(\d+)$/)
  return match ? parseInt(match[1]) : null
}

function getCurrentCardId(e) {
  if (e.target.id && e.target.id.startsWith('card')) return extractNumberFromId(e.target.id)
  return extractNumberFromId(e.target.closest('div').id)
}

function updatePerson(newPerson) {
  const personCardElement = document.querySelector('.person')
  personCardElement.setAttribute('id', `card-${newPerson.id}`)
  const personName = personCardElement.querySelector('p')
  personName.innerText = newPerson.name
  const personImage = personCardElement.querySelector('img')
  personImage.setAttribute('alt', newPerson.name)
  personImage.setAttribute('src', newPerson.image)
}

function warnNotPossibleCombination(dropzoneCardId, draggedCardId) {
  const dropzoneCardElement = document.getElementById(`card-${dropzoneCardId}`)
  const draggedCardElement = document.getElementById(`card-${draggedCardId}`)
  dropzoneCardElement.classList.add('not-combination')
  draggedCardElement.classList.add('not-combination')
  setTimeout(() => {
    dropzoneCardElement.classList.remove('not-combination')
    draggedCardElement.classList.remove('not-combination')
  }, 850)
  return Toaster.display('Combination not possible')
}

function onDrop(e, draggedId) {
  e.preventDefault()

  const dropzoneCardId = getCurrentCardId(e)
  const dropzoneCard = cardsData.find(card => card.id === dropzoneCardId)
  if (!dropzoneCard) return

  const draggedCardId = parseInt(draggedId || e.dataTransfer.getData('text/plain'))
  const combination = combinations.find(({ combo }) => areArraysEqual(combo, [draggedCardId, dropzoneCardId]))
  if (!Boolean(combination)) return warnNotPossibleCombination(dropzoneCardId, draggedCardId)

  Card.applyEffects(combination)
  const resultCards = cardsData.filter(card => combination.result.includes(card.id))
  const createdCards = resultCards.reduce((acc, newCard) => {
    const cardIsCreated = Boolean(document.getElementById(`card-${newCard.id}`))
    if (!cardIsCreated) {
      newCard.isPerson ? updatePerson(newCard) : Card.create(newCard, 'discoveries-board')
      return acc
    }
    return acc.concat(newCard.name)
  }, [])
  if (createdCards.length) {
    Toaster.display(`You already have ${createdCards.join(', ')}`)
  }
}
