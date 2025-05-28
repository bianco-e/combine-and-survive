import cardsData from '../../cards.js'
import Modal from '../modal/index.js'
import {
  MAX_STAT,
  MIN_STAT,
  STAT_CHANGE_LG,
  STAT_CHANGE_SM,
} from '../../constants.js'
import Game from '../game/index.js'
import HudBar from '../hud-bar/index.js'

const TOTAL_DISCOVERIES = cardsData.filter(card => !card.isPerson && !card.isSource).length
export default class Stats {
  static decrease(id, amountToDecrease = STAT_CHANGE_SM) {
    const currentAmount = document.getElementById(`hud-bar-percentage-${id}`).innerText
    const newAmount = parseInt(currentAmount) - amountToDecrease
    const isDead = newAmount <= MIN_STAT
    const newSanitizedAmount = isDead ? MIN_STAT : newAmount
    HudBar.updateFill(id, newSanitizedAmount)
    Game.saveStat(id, newSanitizedAmount)
    if (isDead) {
      Game.endGame(Modal.showLost)
    }
  }

  static increase(id, amountToIncrease = STAT_CHANGE_LG) {
    const currentAmount = document.getElementById(`hud-bar-percentage-${id}`).innerText
    if (parseInt(currentAmount) === MAX_STAT) return
    const newAmount = parseInt(currentAmount) + amountToIncrease
    const isFull = newAmount > MAX_STAT
    const newSanitizedAmount = isFull ? MAX_STAT : newAmount
    HudBar.updateFill(id, newSanitizedAmount)
    Game.saveStat(id, newSanitizedAmount)
  }

  static updateDiscoveries(id) {
    const [_, { discoveriesHistory }] = Game.checkGameInProgress()
    const newDiscoveriesHistory = !id || discoveriesHistory.includes(id) ? discoveriesHistory : discoveriesHistory.concat(id)
    Game.saveDiscoveries(newDiscoveriesHistory)

    const currentDiscoveriesEl = document.getElementById('current-discoveries')
    currentDiscoveriesEl.textContent = newDiscoveriesHistory.length
    if (newDiscoveriesHistory.length === TOTAL_DISCOVERIES) {
      Game.endGame(Modal.showWon)
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

  static initiate(initialStats) {
    const boardLeftTopContainer = document.getElementById('board-left-top-container')
    const discoveriesButton = document.createElement('button')
    discoveriesButton.innerHTML = `📜 &nbsp; <span id="current-discoveries">0</span>/<span>${TOTAL_DISCOVERIES}</span>`
    discoveriesButton.addEventListener('click', Modal.showCombinedCards)
    boardLeftTopContainer.appendChild(discoveriesButton)
    HudBar.create('hud', 'health', '❤️')
    HudBar.create('hud', 'thirst', '💧')
    if (initialStats) {
      if (initialStats.health) {
        HudBar.updateFill('health', Number(initialStats.health))
      }
      if (initialStats.thirst) {
        HudBar.updateFill('thirst', Number(initialStats.thirst))
      }
      this.updateDiscoveries(null)
    }

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
