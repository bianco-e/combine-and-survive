import Gem from '../gem/index.js'
import cardsData from '../../cards.js'
import Modal from '../modal/index.js'

const MAX_STAT = 100
const MIN_STAT = 0

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

  static updateDiscoveries() {
    const currentDiscoveries = document.querySelectorAll('#discoveries-board div.card').length
    const totalDiscoveries = cardsData.filter(card => !card.isInitial && !card.isPerson).length
    const currentDiscoveriesEl = document.getElementById('current-discoveries')
    currentDiscoveriesEl.textContent = currentDiscoveries
    const totalDiscoveriesEl = document.getElementById('total-discoveries')
    totalDiscoveriesEl.textContent = totalDiscoveries
    if (currentDiscoveries === totalDiscoveries) {
      endGame(Modal.showWon)
    }
  }

  static initiate() {
    const statsContainer = document.getElementById('stats')
    const discoveriesContainer = document.createElement('span')

    Gem.create('#991212', 'stats', 'health')
    discoveriesContainer.innerHTML = `DISCOVERIES: <span id="current-discoveries"></span>/<span id="total-discoveries"></span>`
    statsContainer.appendChild(discoveriesContainer)
    Gem.create('#00FFFF', 'stats', 'thirst')
  }
}

function endGame(callback) {
  window.clearInterval(window.thirstIntervalId)
  window.clearInterval(window.animalIntervalId)
  callback()
}