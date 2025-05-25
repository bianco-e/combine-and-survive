import Gem from '../gem/index.js'
import cardsData from '../../cards.js'
import Modal from '../modal/index.js'
import { BADGES_KEY, COMBOS_HISTORY_KEY, DISCOVERIES_HISTORY_KEY } from '../../constants.js'

const MAX_STAT = 100
const MIN_STAT = 0
const TOTAL_DISCOVERIES = cardsData.filter(card => !card.isPerson && !card.isSource).length

export default class Stats {
  static decrease(id, amountToDecrease = 10) {
    const currentAmount = document.querySelector(`#gem-${id}-offset`).innerText
    const newAmount = parseInt(currentAmount) - amountToDecrease
    const isDead = newAmount <= MIN_STAT
    Gem.updateFill(id, isDead ? MIN_STAT : newAmount)
    if (isDead) {
      endGame(Modal.showLost)
    }
  }

  static increase(id, amountToIncrease = 20) {
    const currentAmount = document.querySelector(`#gem-${id}-offset`).innerText
    const newAmount = parseInt(currentAmount) + amountToIncrease
    const isFull = newAmount > MAX_STAT
    Gem.updateFill(id, isFull ? MAX_STAT : newAmount)
  }

  static increaseDiscoveries(id) {
    const discoveriesHistory = JSON.parse(sessionStorage.getItem(DISCOVERIES_HISTORY_KEY)) || []
    const newDiscoveriesHistory = discoveriesHistory.includes(id) ? discoveriesHistory : discoveriesHistory.concat(id)
    sessionStorage.setItem(DISCOVERIES_HISTORY_KEY, JSON.stringify(newDiscoveriesHistory))

    const currentDiscoveriesEl = document.getElementById('current-discoveries')
    currentDiscoveriesEl.textContent = newDiscoveriesHistory.length
    if (newDiscoveriesHistory.length === TOTAL_DISCOVERIES) {
      endGame(Modal.showWon)
    }
  }

  static showNewBadgeIcon() {
    const newBadgeId = 'new-badge-icon'
    const badgesButton = document.getElementById('badges-button')
    const newBadgeIcon = document.createElement('span')
    newBadgeIcon.setAttribute('id', newBadgeId)
    newBadgeIcon.classList.add('new-badge')
    if (!document.getElementById(newBadgeId)) {
      badgesButton.appendChild(newBadgeIcon)
      badgesButton.classList.add('highlight-button')
      setTimeout(() => {
        badgesButton.classList.remove('highlight-button')
      }, 850)
    }
  }

  static removeNewBadgeIcon() {
    const badgesButton = document.getElementById('badges-button')
    const newBadgeIcon = document.getElementById('new-badge-icon')
    if (Boolean(newBadgeIcon)) {
      badgesButton.removeChild(newBadgeIcon)
    }
  }

  static initiate() {
    const boardLeftTopContainer = document.getElementById('board-left-top-container')
    const discoveriesButton = document.createElement('button')
    sessionStorage.clear(DISCOVERIES_HISTORY_KEY)
    sessionStorage.clear(COMBOS_HISTORY_KEY)
    sessionStorage.clear(BADGES_KEY)
    discoveriesButton.innerHTML = `📜 &nbsp; <span id="current-discoveries">0</span>/<span>${TOTAL_DISCOVERIES}</span>`
    discoveriesButton.addEventListener('click', Modal.showCombinedCards)
    boardLeftTopContainer.appendChild(discoveriesButton)
    Gem.create('#991212', 'stats', 'health')
    Gem.create('#00FFFF', 'stats', 'thirst')

    if (import.meta.env.MODE === 'development') {
      // show all possible combinations in dev mode ONLY
      const allPossibleCombinationsButton = document.createElement('button')
      allPossibleCombinationsButton.innerHTML = `🃏`
      allPossibleCombinationsButton.classList.add('board-button')
      allPossibleCombinationsButton.addEventListener('click', Modal.showAllCombinationRecipes)
      boardLeftTopContainer.appendChild(allPossibleCombinationsButton)
    }
  }
}

function endGame(callback) {
  window.clearInterval(window.thirstIntervalId)
  window.clearInterval(window.animalIntervalId)
  callback()
}
