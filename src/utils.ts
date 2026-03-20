import cardsData, { CARD_KEY } from './cards'
import Stats from './components/stats'
import Toaster from './components/toaster'
import Card from './components/card'
import i18n from './i18n'
import { LOW_THIRST_WARNING, STAT_CHANGE_SM } from './constants'
import Modal from './components/modal'
import { ToastType, type CardKey } from './types'

function getCardByKey(cardKey: CardKey) {
  return cardsData.find(card => card.key === cardKey) ?? null
}

export function capitalize(value: string): string {
  return value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase()
}

export function areArraysEqual<T extends string>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false
  const sortedArr1 = arr1.slice().sort()
  const sortedArr2 = arr2.slice().sort()
  return !sortedArr1.some((n, idx) => n !== sortedArr2[idx])
}

export const addSourceCardToBoard = (cardKey: CardKey, messageOnAdd: string): void => {
  const sourceCard = getCardByKey(cardKey)
  if (!sourceCard) return

  const sourceCardElement = document.getElementById(`card-${sourceCard.key}`)
  if (sourceCardElement) return
  Card.create(sourceCard, 'sources-board', { updateDiscoveries: false, isInteractive: true })
  Toaster.display(messageOnAdd, ToastType.Success)
}

export const addWildAnimalToBoard = (animalKey: CardKey, messageOnAdd: string, cardKeyToRemove?: CardKey): void => {
  const animalCard = getCardByKey(animalKey)
  if (!animalCard) return

  const animalCardElement = document.getElementById(`card-${animalCard.key}`)
  const currentDiscoveries = document.querySelectorAll('#discoveries-board div.card').length
  if (animalCardElement || !currentDiscoveries) return
  Card.create(animalCard, 'discoveries-board')
  if (cardKeyToRemove) {
    Card.remove(cardKeyToRemove, 'discoveries-board')
  }
  Toaster.display(messageOnAdd, ToastType.Success)
}

export const setInitialBoard = (): void => {
  const initialBoard = `
    <div id="board-left-top-container" class="board-buttons-container discoveries"></div>

    <div id="board-right-top-container" class="board-buttons-container badges-instructions">
      <button class="board-button" id="badges-button">🏅</button>
      <button class="board-button" id="instructions-button">❔</button>
    </div>

    <div id="overlay" class="overlay"></div>

    <div class="content-wrapper">
      <div id="person-board" class="board"></div>
      <div id="sources-board" class="board"></div>
      <div id="discoveries-board" class="board"></div>
    </div>

    <div id="toasters-wrapper"></div>
    <dialog id="modal" class="modal"></dialog>

    <div id="hud" class="hud-container"></div>
    <script src="./index.ts" type="module"></script>
  `
  document.body.innerHTML = initialBoard
}

export function setInitialIntervalsAndButtonsOnClick(): void {
  document.getElementById('badges-button')?.addEventListener('click', Modal.showBadges)
  document.getElementById('instructions-button')?.addEventListener('click', () =>
    Modal.showInstructions({ isInitialInstructions: false })
  )

  window.thirstIntervalId = window.setInterval(() => {
    const thirstEl = document.getElementById('hud-bar-percentage-thirst')
    const currentThirst = parseInt(thirstEl?.innerText ?? '0', 10)
    if (currentThirst <= LOW_THIRST_WARNING) {
      Toaster.display(i18n.t('thirstDeath'), ToastType.Error)
    }
    Stats.decrease('thirst', STAT_CHANGE_SM)
  }, 13000)

  window.animalIntervalId = window.setInterval(() => {
    addWildAnimalToBoard(CARD_KEY.BULL, i18n.t('wildBull'))
  }, 26000)
}
