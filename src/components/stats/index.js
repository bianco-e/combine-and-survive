import Gem from '../gem/index.js'
import cardsData from '../../cards.js'
import Modal from '../modal/index.js'
import { COMBOS_HISTORY_KEY, DISCOVERIES_HISTORY_KEY } from '../../constants.js'

const MAX_STAT = 100
const MIN_STAT = 0
const TOTAL_DISCOVERIES = cardsData.filter(card => !card.isInitial && !card.isPerson).length

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

  static initiate() {
    const statsContainer = document.getElementById('stats')
    const discoveriesButton = document.createElement('button')
    sessionStorage.clear(DISCOVERIES_HISTORY_KEY)
    sessionStorage.clear(COMBOS_HISTORY_KEY)

    Gem.create('#991212', 'stats', 'health')
    discoveriesButton.innerHTML = `📜 &nbsp; <span id="current-discoveries">0</span>/<span>${TOTAL_DISCOVERIES}</span>`
    discoveriesButton.addEventListener('click', Modal.showCombinedCards)
    statsContainer.appendChild(discoveriesButton)
    Gem.create('#00FFFF', 'stats', 'thirst')
  }
}

function endGame(callback) {
  window.clearInterval(window.thirstIntervalId)
  window.clearInterval(window.animalIntervalId)
  callback()
}
