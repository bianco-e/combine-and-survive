import cardsData from '../../cards.js'
import combinations from '../../combinations.js'
import i18n from '../../i18n.js'
import { areArraysEqual } from '../../utils.js'
import { COMBOS_HISTORY_KEY, LANG } from '../../constants.js'
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

  static create({ id, name, image, className }, boardId, cardConfig = { increaseDiscoveries: true, isInteractive: true }) {
    const { isInteractive, increaseDiscoveries } = cardConfig
    const newCardElement = document.createElement('div')
    newCardElement.classList.add('card', 'new-card')
    if (isInteractive) {
      newCardElement.setAttribute('id', `card-${id}`)
      newCardElement.setAttribute('draggable', 'true')
      this.addListeners(newCardElement)
    } else {
      newCardElement.classList.add('non-interactive-card')
    }
    const newCardName = document.createElement('p')
    newCardName.innerText = name[LANG]
    newCardName.title = name[LANG]
    newCardName.setAttribute('draggable', 'false')
    newCardElement.appendChild(newCardName)
    const newCardImg = document.createElement('img')
    newCardImg.setAttribute('src', image)
    newCardImg.setAttribute('alt', name[LANG])
    newCardImg.setAttribute('draggable', 'false')
    if (className) {
      newCardElement.classList.add(className)
    }
    newCardElement.appendChild(newCardImg)
    const board = document.getElementById(boardId)
    board.appendChild(newCardElement)
    if (increaseDiscoveries) {
      Stats.increaseDiscoveries(id)
    }
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
  personName.innerText = newPerson.name[LANG]
  const personImage = personCardElement.querySelector('img')
  personImage.setAttribute('alt', newPerson.name[LANG])
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
  return Toaster.display(i18n.combinationNotPossible[LANG])
}

function onDrop(e, draggedId) {
  e.preventDefault()

  const dropzoneCardId = getCurrentCardId(e)
  const dropzoneCard = cardsData.find(card => card.id === dropzoneCardId)
  if (!dropzoneCard) return

  const draggedCardId = parseInt(draggedId || e.dataTransfer.getData('text/plain'))
  const combinedIds = [draggedCardId, dropzoneCardId]
  const combination = combinations.find(({ combo }) => areArraysEqual(combo, combinedIds))
  if (!Boolean(combination)) return warnNotPossibleCombination(dropzoneCardId, draggedCardId)

  Card.applyEffects(combination)
  const resultCards = cardsData.filter(card => combination.result.includes(card.id))
  const createdCards = resultCards.reduce((acc, newCard) => {
    const existingCard = document.getElementById(`card-${newCard.id}`)
    if (!Boolean(existingCard)) {
      if (newCard.isPerson) {
        updatePerson(newCard)
      } else {
        const combosHistory = JSON.parse(sessionStorage.getItem(COMBOS_HISTORY_KEY)) || []
        const comboExists = combosHistory.find(({ combo }) => areArraysEqual(combo, combinedIds))
        const newCombosHistory = comboExists
          ? combosHistory
          : combosHistory.concat({ combo: combinedIds, result: combination.result })
        sessionStorage.setItem(COMBOS_HISTORY_KEY, JSON.stringify(newCombosHistory))
        Card.create(newCard, 'discoveries-board')
      }
      return acc
    }
    existingCard.classList.add('highlight')
    setTimeout(() => {
      existingCard.classList.remove('highlight')
    }, 650)
    return acc.concat(newCard.name[LANG])
  }, [])
  if (createdCards.length) {
    Toaster.display(`${i18n.alreadyCreatedCard[LANG]} ${createdCards.join(', ')}`)
  }
}
