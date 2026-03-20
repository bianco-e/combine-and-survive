import cardsData from '../../cards'
import Modal from '../modal'
import { MAX_STAT, MIN_STAT, STAT_CHANGE_LG, STAT_CHANGE_MD, STAT_CHANGE_SM } from '../../constants'
import Game from '../game'
import HudBar from '../hud-bar'
import type { CardKey, StatId, StatsStatus } from '../../types'

const TOTAL_DISCOVERIES = cardsData.filter(card => !card.isPerson && !card.isSource).length

function getHudAmount(id: StatId): number {
  const element = document.getElementById(`hud-bar-percentage-${id}`)
  if (!(element instanceof HTMLElement)) return MAX_STAT
  return parseInt(element.innerText, 10)
}

export default class Stats {
  static decrease(id: StatId, amountToDecrease = STAT_CHANGE_SM): void {
    const newAmount = getHudAmount(id) - amountToDecrease
    const isDead = newAmount <= MIN_STAT
    const newSanitizedAmount = isDead ? MIN_STAT : newAmount
    HudBar.updateFill(id, newSanitizedAmount)
    if (id === 'health') {
      HudBar.triggerHealthDecreaseEffect()
      if (amountToDecrease >= STAT_CHANGE_MD) {
        HudBar.triggerDamageFlash()
      }
    }
    Game.saveStat(id, newSanitizedAmount)
    if (isDead) {
      Game.endGame(Modal.showLost)
    }
  }

  static increase(id: StatId, amountToIncrease = STAT_CHANGE_LG): void {
    const currentAmount = getHudAmount(id)
    if (currentAmount === MAX_STAT) return
    const newAmount = currentAmount + amountToIncrease
    const isFull = newAmount > MAX_STAT
    const newSanitizedAmount = isFull ? MAX_STAT : newAmount
    HudBar.updateFill(id, newSanitizedAmount)
    Game.saveStat(id, newSanitizedAmount)
  }

  static updateDiscoveries(cardKey: CardKey | null): void {
    const [, { discoveriesHistory }] = Game.checkGameInProgress()
    const newDiscoveriesHistory =
      !cardKey || discoveriesHistory.includes(cardKey) ? discoveriesHistory : discoveriesHistory.concat(cardKey)
    Game.saveDiscoveries(newDiscoveriesHistory)

    const currentDiscoveriesEl = document.getElementById('current-discoveries')
    if (currentDiscoveriesEl instanceof HTMLElement) {
      currentDiscoveriesEl.textContent = String(newDiscoveriesHistory.length)
    }
    if (newDiscoveriesHistory.length === TOTAL_DISCOVERIES) {
      Game.endGame(Modal.showWon)
    }
  }

  static showNewBadgeIcon(): void {
    const newBadgeId = 'new-badge-icon'
    const badgesButton = document.getElementById('badges-button')
    if (!(badgesButton instanceof HTMLElement)) return

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

  static removeNewBadgeIcon(): void {
    const badgesButton = document.getElementById('badges-button')
    const newBadgeIcon = document.getElementById('new-badge-icon')
    if (badgesButton instanceof HTMLElement && newBadgeIcon instanceof HTMLElement) {
      badgesButton.removeChild(newBadgeIcon)
    }
  }

  static initiate(initialStats?: StatsStatus): void {
    const boardLeftTopContainer = document.getElementById('board-left-top-container')
    if (!(boardLeftTopContainer instanceof HTMLElement)) return

    const discoveriesButton = document.createElement('button')
    discoveriesButton.innerHTML = `📜 &nbsp; <span id="current-discoveries">0</span>/<span>${TOTAL_DISCOVERIES}</span>`
    discoveriesButton.addEventListener('click', Modal.showCombinedCards)
    boardLeftTopContainer.appendChild(discoveriesButton)
    HudBar.create('hud', 'health', '❤️')
    HudBar.create('hud', 'thirst', '💧')

    if (initialStats) {
      if (typeof initialStats.health === 'number') {
        HudBar.updateFill('health', Number(initialStats.health))
      }
      if (typeof initialStats.thirst === 'number') {
        HudBar.updateFill('thirst', Number(initialStats.thirst))
      }
      this.updateDiscoveries(null)
    }

    if (import.meta.env.MODE === 'development') {
      const allPossibleCombinationsButton = document.createElement('button')
      allPossibleCombinationsButton.innerHTML = '🃏'
      allPossibleCombinationsButton.classList.add('board-button')
      allPossibleCombinationsButton.addEventListener('click', Modal.showAllCombinationRecipes)
      boardLeftTopContainer.appendChild(allPossibleCombinationsButton)
    }
  }
}
