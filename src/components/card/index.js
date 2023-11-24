import cardsData from '../../cards.js'
import Stats from '../stats/index.js'
import Toaster from '../toaster/index.js'

export default class Card {
  static addListeners(cardElement) {
    cardElement.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', getCurrentCardId(e)))
    cardElement.addEventListener('dragover', e => e.preventDefault())
    cardElement.addEventListener('drop', onDrop)
  }

  static applyEffects(dropzoneCard, draggedCard) {
    if (![dropzoneCard, draggedCard].some(card => card.isPerson)) return
    [dropzoneCard, draggedCard].forEach(card => {
      if (card.increase) {
        Object.entries(card.increase).forEach(([stat, amount]) => Stats.increase(stat, amount))
      }
      if (card.decrease) {
        Object.entries(card.decrease).forEach(([stat, amount]) => Stats.decrease(stat, amount))
      }
      if (card.singleUse) {
        this.remove(card.id, 'discoveries-board')
      }
    })
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
  return match ? match[1] : null
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
  Toaster.display(`You are an ${newPerson.name} now`, 'success')
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
  const dropzoneCard = cardsData.find(card => card.id === parseInt(dropzoneCardId))
  if (!dropzoneCard) return

  const draggedCardId = draggedId || e.dataTransfer.getData('text/plain')
  const combinationResultIds = dropzoneCard.combinations[draggedCardId]
  if (!Boolean(combinationResultIds)) {
    const personId = cardsData[0].id
    const draggedCard = cardsData.find(card => card.id === parseInt(draggedCardId))
    const isDraggedCardPerson = draggedCard?.isPerson
    const isCombinationForPerson = Object.keys(dropzoneCard.combinations).includes(personId.toString())
    if (isDraggedCardPerson && isCombinationForPerson) return onDrop(e, personId)
    const isUnequippedPerson = [dropzoneCard.id, parseInt(draggedCardId)].includes(personId)
    const isAnimal = draggedCard?.isAnimal || dropzoneCard.isAnimal
    if (isUnequippedPerson && isAnimal) {
      Toaster.display(`You can't kill a bull with your hands`, 'error')
      return Stats.decrease('health', 20)
    }
    return warnNotPossibleCombination(dropzoneCardId, draggedCardId)
  }

  const draggedCard = cardsData.find(card => card.id === parseInt(draggedCardId))
  Card.applyEffects(dropzoneCard, draggedCard)
  const combinationResults = cardsData.filter(card => combinationResultIds.includes(card.id))
  combinationResults.forEach(newCard => {
    const combinationExists = Boolean(document.getElementById(`card-${newCard.id}`))
    if (!combinationExists) return newCard.isPerson ? updatePerson(newCard) : Card.create(newCard, 'discoveries-board')
    return Toaster.display(`You already have ${newCard.name}`)
  })
}

