import cardsData from '../../cards'
import combinations from '../../combinations'
import i18n from '../../i18n'
import { areArraysEqual } from '../../utils'
import { IDLE, type CardConfig, type CardData, type CardKey, type Combination, type StatId } from '../../types'
import Stats from '../stats'
import Toaster from '../toaster'
import Game from '../game'

function toCardKey(value: string | null): CardKey | null {
  if (!value) return null
  return cardsData.some(card => card.key === value) ? (value as CardKey) : null
}

function toHtmlElement(value: Element | null): HTMLElement | null {
  return value instanceof HTMLElement ? value : null
}

export default class Card {
  static refreshTranslations(): void {
    const cardElements = document.querySelectorAll('[id^="card-"], [non-interactive-id^="card-"]')
    cardElements.forEach(cardElement => {
      if (!(cardElement instanceof HTMLElement)) return
      const cardId = cardElement.getAttribute('id') || cardElement.getAttribute('non-interactive-id')
      if (!cardId) return
      const key = toCardKey(cardId.replace(/^card-/, ''))
      if (!key) return

      const translatedName = i18n.t(`cards.${key}`)
      const cardNameElement = cardElement.querySelector('p')
      if (cardNameElement instanceof HTMLElement) {
        cardNameElement.textContent = translatedName
        cardNameElement.title = translatedName
      }
      const cardImageElement = cardElement.querySelector('img:not(.equippable-icon)')
      if (cardImageElement instanceof HTMLImageElement) {
        cardImageElement.alt = translatedName
      }
      const equippableIconElement = cardElement.querySelector('.equippable-icon')
      if (equippableIconElement instanceof HTMLImageElement) {
        const equippableText = i18n.t('equippableCard')
        equippableIconElement.alt = equippableText
        equippableIconElement.title = equippableText
      }
    })
  }

  static addListeners(cardElement: HTMLElement): void {
    cardElement.addEventListener('dragstart', e => {
      const dragEvent = e as DragEvent
      dragEvent.dataTransfer?.setData('text/plain', getCurrentCardKey(dragEvent) ?? '')
    })
    cardElement.addEventListener('dragover', e => e.preventDefault())
    cardElement.addEventListener('dragenter', e => e.preventDefault())
    cardElement.addEventListener('drop', e => onDrop(e as DragEvent))
  }

  static applyEffects(combination: Combination): void {
    if (combination.increase) {
      Object.entries(combination.increase).forEach(([stat, amount]) => {
        if (typeof amount === 'number') {
          Stats.increase(stat as StatId, amount)
        }
      })
    }
    if (combination.decrease) {
      Object.entries(combination.decrease).forEach(([stat, amount]) => {
        if (typeof amount === 'number') {
          Stats.decrease(stat as StatId, amount)
        }
      })
    }
    if (combination.result !== IDLE && combination.consumes.length) {
      combination.consumes.forEach(consumedKey => {
        this.remove(consumedKey, 'discoveries-board')
      })
    }
  }

  static remove(cardKey: CardKey, boardId: string): void {
    const board = document.getElementById(boardId)
    const cardToRemove = document.getElementById(`card-${cardKey}`)
    if (board instanceof HTMLElement && cardToRemove instanceof HTMLElement) {
      board.removeChild(cardToRemove)
    }
  }

  static create(
    { key, image, className, isEquippable }: CardData,
    boardId: string,
    cardConfig: CardConfig = { updateDiscoveries: true, isInteractive: true }
  ): void {
    const { isInteractive, updateDiscoveries } = cardConfig
    const newCardElement = document.createElement('div')
    newCardElement.classList.add('card', 'new-card')
    if (isInteractive) {
      newCardElement.setAttribute('id', `card-${key}`)
      newCardElement.setAttribute('draggable', 'true')
      this.addListeners(newCardElement)
    } else {
      newCardElement.setAttribute('non-interactive-id', `card-${key}`)
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
    if (!(board instanceof HTMLElement)) return
    board.appendChild(newCardElement)
    if (updateDiscoveries) {
      Stats.updateDiscoveries(key)
    }
    setTimeout(() => {
      newCardElement.classList.remove('new-card')
    }, 300)
  }
}

function renderEquippableIcon(newCardElement: HTMLElement): void {
  const equippableIcon = document.createElement('img')
  equippableIcon.setAttribute('src', '/icons/equippable-icon.webp')
  equippableIcon.setAttribute('alt', i18n.t('equippableCard'))
  equippableIcon.title = i18n.t('equippableCard')
  equippableIcon.classList.add('equippable-icon')
  newCardElement.appendChild(equippableIcon)
}

function keyFromCardDomId(domId: string | null): CardKey | null {
  if (!domId || !domId.startsWith('card-')) return null
  return toCardKey(domId.slice(5))
}

function getCurrentCardKey(e: DragEvent): CardKey | null {
  const target = e.target
  if (!(target instanceof HTMLElement)) return null

  if (target.id && target.id.startsWith('card-')) return keyFromCardDomId(target.id)
  const closestCard = target.closest('div[id^="card-"]')
  return keyFromCardDomId(closestCard?.id ?? null)
}

function parseDraggedCardKey(raw: string | undefined): CardKey | null {
  if (raw == null || raw === '') return null
  return toCardKey(String(raw))
}

function updatePerson(newPerson: CardData): void {
  const personCardElement = toHtmlElement(document.querySelector('.person'))
  if (!personCardElement) return

  personCardElement.setAttribute('id', `card-${newPerson.key}`)
  const personName = personCardElement.querySelector('p')
  if (personName instanceof HTMLElement) {
    personName.innerText = i18n.t(`cards.${newPerson.key}`)
    personName.title = i18n.t(`cards.${newPerson.key}`)
  }
  const personImage = personCardElement.querySelector('img')
  if (personImage instanceof HTMLImageElement) {
    personImage.setAttribute('alt', i18n.t(`cards.${newPerson.key}`))
    personImage.setAttribute('src', newPerson.image)
  }
  Game.savePerson(newPerson.key)
}

function warnNotPossibleCombination(dropzoneCardKey: CardKey, draggedCardKey: CardKey): void {
  const dropzoneCardElement = document.getElementById(`card-${dropzoneCardKey}`)
  const draggedCardElement = document.getElementById(`card-${draggedCardKey}`)
  if (dropzoneCardElement instanceof HTMLElement) {
    dropzoneCardElement.classList.add('shake-horizontal')
  }
  if (draggedCardElement instanceof HTMLElement) {
    draggedCardElement.classList.add('shake-horizontal')
  }
  setTimeout(() => {
    dropzoneCardElement?.classList.remove('shake-horizontal')
    draggedCardElement?.classList.remove('shake-horizontal')
  }, 850)
  Game.updateWrongComboNumber()
  Toaster.display(i18n.t('combinationNotPossible'))
}

function onDrop(e: DragEvent, draggedId?: string): void {
  e.preventDefault()

  const dropzoneCardKey = getCurrentCardKey(e)
  const dropzoneCard = cardsData.find(card => card.key === dropzoneCardKey)
  if (!dropzoneCard || !dropzoneCardKey) return

  const draggedCardKey = parseDraggedCardKey(draggedId ?? e.dataTransfer?.getData('text/plain'))
  if (!draggedCardKey) return

  const combinedKeys: [CardKey, CardKey] = [draggedCardKey, dropzoneCardKey]
  const combination = combinations.find(({ combo }) => areArraysEqual(combo, combinedKeys))
  if (!combination) {
    warnNotPossibleCombination(dropzoneCardKey, draggedCardKey)
    return
  }
  gtag('event', 'new_combination', {
    event_category: 'game',
    event_label: 'successful_combination',
    combination: JSON.stringify(combination)
  })

  Card.applyEffects(combination)
  if (combination.badge) {
    const [, { currentBadges }] = Game.checkGameInProgress()
    if (!currentBadges.includes(combination.badge)) {
      Game.saveBadges(currentBadges.concat(combination.badge))
      Stats.showNewBadgeIcon()
    }
  }

  const resultKeys = combination.result === IDLE ? [] : combination.result
  const resultCards = cardsData.filter(card => resultKeys.includes(card.key))
  const alreadyCreatedCards = resultCards.reduce<string[]>((acc, newCard) => {
    const existingCard = document.getElementById(`card-${newCard.key}`)
    if (!existingCard) {
      if (newCard.isPerson) {
        updatePerson(newCard)
      } else {
        const [, { combosHistory }] = Game.checkGameInProgress()
        const comboExists = combosHistory.find(({ combo }) => areArraysEqual(combo, combinedKeys))
        const newCombosHistory = comboExists
          ? combosHistory
          : combosHistory.concat({ combo: combinedKeys, result: resultKeys })
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
