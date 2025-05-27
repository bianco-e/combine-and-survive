import cardsData from '../../cards.js'
import combinations from '../../combinations.js'
import i18n from '../../i18n.js'
import { areArraysEqual } from '../../utils.js'
import { IDLE } from '../../constants.js'
import Stats from '../stats/index.js'
import Toaster from '../toaster/index.js'
import Game from '../game/index.js'

export default class Card {
  static addListeners(cardElement) {
    cardElement.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', getCurrentCardId(e)))
    cardElement.addEventListener('dragover', e => e.preventDefault())
    cardElement.addEventListener('dragenter', e => e.preventDefault())
    cardElement.addEventListener('drop', onDrop)
  }

  static applyEffects(combination) {
    if (combination.increase) {
      Object.entries(combination.increase).forEach(([stat, amount]) => Stats.increase(stat, amount))
    }
    if (combination.decrease) {
      Object.entries(combination.decrease).forEach(([stat, amount]) => Stats.decrease(stat, amount))
    }
    if (combination.consumes !== IDLE && Boolean(combination.consumes.length)) {
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

  static create(
    { id, key, image, className, isEquippable },
    boardId,
    cardConfig = { updateDiscoveries: true, isInteractive: true }
  ) {
    const { isInteractive, updateDiscoveries } = cardConfig
    const newCardElement = document.createElement('div')
    newCardElement.classList.add('card', 'new-card')
    if (isInteractive) {
      newCardElement.setAttribute('id', `card-${id}`)
      newCardElement.setAttribute('draggable', 'true')
      this.addListeners(newCardElement)
    } else {
      newCardElement.setAttribute('non-interactive-id', `card-${id}`)
      newCardElement.classList.add('non-interactive-card')
    }
    const newCardName = document.createElement('p')
    newCardName.innerText = i18n.t(`cards.${key}`)
    newCardName.title = i18n.t(`cards.${key}`)
    newCardName.setAttribute('draggable', 'false')
    newCardElement.appendChild(newCardName)
    const newCardImg = document.createElement('img')
    newCardImg.setAttribute('src', image)
    newCardImg.setAttribute('alt', i18n.t(`cards.${key}`))
    newCardImg.setAttribute('draggable', 'false')

    if (isEquippable) {
      renderEquippableIcon(newCardElement)
    }
    if (className) {
      newCardElement.classList.add(className)
    }
    newCardElement.appendChild(newCardImg)
    const board = document.getElementById(boardId)
    board.appendChild(newCardElement)
    if (updateDiscoveries) {
      Stats.updateDiscoveries(id)
    }
    setTimeout(() => {
      newCardElement.classList.remove('new-card')
    }, 300)
  }
}

function renderEquippableIcon(newCardElement) {
  const equippableIcon = document.createElement('img')
  equippableIcon.setAttribute('src', '/icons/equippable-icon.webp')
  equippableIcon.setAttribute('alt', i18n.t('equippableCard'))
  equippableIcon.title = i18n.t('equippableCard')
  equippableIcon.classList.add('equippable-icon')
  newCardElement.appendChild(equippableIcon)
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
  personName.innerText = i18n.t(`cards.${newPerson.key}`)
  personName.title = i18n.t(`cards.${newPerson.key}`)
  const personImage = personCardElement.querySelector('img')
  personImage.setAttribute('alt', i18n.t(`cards.${newPerson.key}`))
  personImage.setAttribute('src', newPerson.image)
  Game.savePerson(newPerson.key)
}

function warnNotPossibleCombination(dropzoneCardId, draggedCardId) {
  const dropzoneCardElement = document.getElementById(`card-${dropzoneCardId}`)
  const draggedCardElement = document.getElementById(`card-${draggedCardId}`)
  dropzoneCardElement.classList.add('shake-horizontal')
  draggedCardElement.classList.add('shake-horizontal')
  setTimeout(() => {
    dropzoneCardElement.classList.remove('shake-horizontal')
    draggedCardElement.classList.remove('shake-horizontal')
  }, 850)
  return Toaster.display(i18n.t('combinationNotPossible'))
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
  gtag('event', 'new_combination', {
    event_category: 'game',
    event_label: 'successful_combination',
    combination: JSON.stringify(combination)
  })

  Card.applyEffects(combination)
  if (combination.badge) {
    const [_, { currentBadges }] = Game.checkGameInProgress()
    if (!currentBadges.includes(combination.badge)) {
      Game.saveBadges(currentBadges.concat(combination.badge))
      Stats.showNewBadgeIcon()
    }
  }

  const resultCards = cardsData.filter(card => combination.result.includes(card.id))
  const alreadyCreatedCards = resultCards.reduce((acc, newCard) => {
    const existingCard = document.getElementById(`card-${newCard.id}`)
    if (!Boolean(existingCard)) {
      if (newCard.isPerson) {
        updatePerson(newCard)
      } else {
        const [_, { combosHistory }] = Game.checkGameInProgress()
        const comboExists = combosHistory.find(({ combo }) => areArraysEqual(combo, combinedIds))
        const newCombosHistory = comboExists
          ? combosHistory
          : combosHistory.concat({ combo: combinedIds, result: combination.result })
        Game.saveCombosHistory(newCombosHistory)
        Card.create(newCard, 'discoveries-board')
      }
      if (combination.callback) {
        combination.callback()
      }
      return acc
    }
    existingCard.classList.add('highlight-card')
    setTimeout(() => {
      existingCard.classList.remove('highlight-card')
    }, 650)
    return acc.concat(i18n.t(`cards.${newCard.key}`))
  }, [])
  if (alreadyCreatedCards.length) {
    Toaster.display(`${i18n.t('alreadyCreatedCard')} ${alreadyCreatedCards.join(', ')}`)
  }
  if (combination.message) {
    Toaster.display(i18n.t(combination.message.i18nKey), combination.message.type)
  }
  Game.saveCurrentBoards()
}
