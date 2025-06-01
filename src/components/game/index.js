import {
  BADGES_KEY,
  COMBOS_HISTORY_KEY,
  CURRENT_BOARDS_KEY,
  DISCOVERIES_HISTORY_KEY,
  PERSON_KEY,
  STATS_STATUS_KEY,
  SUGGESTIONS_DISABLED_KEY,
  WRONG_COMBO_KEY
} from '../../constants.js'
import Card from '../card/index.js'
import Stats from '../stats/index.js'
import cardsData from '../../cards.js'
import { setInitialIntervalsAndButtonsOnClick } from '../../utils.js'
import Modal from '../modal/index.js'

const WRONG_COMBOS_FOR_SUGGESTION = 12

export default class Game {
  static clearSavedGame() {
    localStorage.clear(DISCOVERIES_HISTORY_KEY)
    localStorage.clear(COMBOS_HISTORY_KEY)
    localStorage.clear(BADGES_KEY)
    localStorage.clear(STATS_STATUS_KEY)
    localStorage.clear(PERSON_KEY)
    localStorage.clear(CURRENT_BOARDS_KEY)
    sessionStorage.clear(WRONG_COMBO_KEY)
  }

  static updateSuggestionsDisabled(value) {
    sessionStorage.setItem(SUGGESTIONS_DISABLED_KEY, value)
  }

  static checkGameInProgress() {
    const discoveriesHistory = JSON.parse(localStorage.getItem(DISCOVERIES_HISTORY_KEY)) || []
    const combosHistory = JSON.parse(localStorage.getItem(COMBOS_HISTORY_KEY)) || []
    const currentBadges = JSON.parse(localStorage.getItem(BADGES_KEY)) || []
    const currentBoards = JSON.parse(localStorage.getItem(CURRENT_BOARDS_KEY)) || {}
    const currentStats = JSON.parse(localStorage.getItem(STATS_STATUS_KEY)) || {}
    const personKey = localStorage.getItem(PERSON_KEY)
    const suggestionsDisabled = sessionStorage.getItem(SUGGESTIONS_DISABLED_KEY)
    const gameInProgress = !!discoveriesHistory.length && !!combosHistory.length
    return [
      gameInProgress,
      {
        discoveriesHistory,
        combosHistory,
        currentBadges,
        currentStats,
        personKey,
        currentBoards,
        suggestionsDisabled
      }
    ]
  }

  static saveCurrentBoards() {
    const currentDiscoveriesBoardIds = Array.from(document.querySelectorAll('#discoveries-board div.card')).map(
      cardElement => Number(cardElement.getAttribute('id').replace('card-', ''))
    )
    const currentSourcesBoardIds = Array.from(document.querySelectorAll('#sources-board div.card')).map(cardElement =>
      Number(cardElement.getAttribute('id').replace('card-', ''))
    )
    localStorage.setItem(
      CURRENT_BOARDS_KEY,
      JSON.stringify({ discoveries: currentDiscoveriesBoardIds, sources: currentSourcesBoardIds })
    )
  }

  static saveCombosHistory(newCombosHistory) {
    localStorage.setItem(COMBOS_HISTORY_KEY, JSON.stringify(newCombosHistory))
  }

  static saveBadges(newBadges) {
    localStorage.setItem(BADGES_KEY, JSON.stringify(newBadges))
  }

  static savePerson(personKey) {
    localStorage.setItem(PERSON_KEY, personKey)
  }

  static saveStat(id, amount) {
    const [_, { currentStats }] = Game.checkGameInProgress()
    localStorage.setItem(
      STATS_STATUS_KEY,
      JSON.stringify({
        ...currentStats,
        [id]: amount
      })
    )
  }

  static saveDiscoveries(newDiscoveries) {
    localStorage.setItem(DISCOVERIES_HISTORY_KEY, JSON.stringify(newDiscoveries))
  }

  static updateWrongComboNumber() {
    const newWrongComboNumber = Number(sessionStorage.getItem(WRONG_COMBO_KEY) || 0) + 1
    const suggestCombination = newWrongComboNumber >= WRONG_COMBOS_FOR_SUGGESTION
    sessionStorage.setItem(WRONG_COMBO_KEY, suggestCombination ? 0 : newWrongComboNumber)
    if (suggestCombination) {
      Modal.showCombinationSuggestion()
    }
  }

  static endGame(callback) {
    window.clearInterval(window.thirstIntervalId)
    window.clearInterval(window.animalIntervalId)
    this.clearSavedGame()
    callback()
  }

  static renderInitialCards(personCard, boardsToResume) {
    //create Person
    Card.create({ ...personCard, className: 'person' }, 'person-board', {
      updateDiscoveries: false,
      isInteractive: true
    })

    //create initial cards
    const initialCards = boardsToResume?.sources
      ? cardsData.filter(card => boardsToResume.sources.includes(card.id))
      : cardsData.filter(card => card.isInitial && !card.isPerson)
    initialCards.forEach(card => Card.create(card, 'sources-board', { updateDiscoveries: false, isInteractive: true }))

    //create discoveries cards in case it is resumed game
    if (boardsToResume?.discoveries) {
      const discoveriesCards = cardsData.filter(card => boardsToResume.discoveries.includes(card.id))
      discoveriesCards.forEach(card => Card.create(card, 'discoveries-board'), {
        updateDiscoveries: false,
        isInteractive: true
      })
    }
  }

  static startGame() {
    Game.clearSavedGame()
    Stats.initiate()
    this.renderInitialCards(cardsData[0])
    setInitialIntervalsAndButtonsOnClick()
  }

  static resumeGame() {
    const [_, { currentBoards, currentStats, personKey }] = this.checkGameInProgress()
    Stats.initiate(currentStats)
    const currentPerson = cardsData.find(card => card.isPerson && card.key === personKey) || cardsData[0]

    this.renderInitialCards(currentPerson, currentBoards)
    setInitialIntervalsAndButtonsOnClick()
  }
}
