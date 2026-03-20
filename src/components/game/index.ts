import {
  BADGES_KEY,
  COMBOS_HISTORY_KEY,
  CURRENT_BOARDS_KEY,
  DISCOVERIES_HISTORY_KEY,
  PERSON_KEY,
  STATS_STATUS_KEY,
  SUGGESTIONS_DISABLED_KEY,
  WRONG_COMBO_KEY
} from '../../constants'
import Card from '../card'
import Stats from '../stats'
import cardsData from '../../cards'
import { setInitialIntervalsAndButtonsOnClick } from '../../utils'
import Modal from '../modal'
import type { BoardsState, CardConfig, CardData, CardKey, ComboHistory, GameState, SavedGameData, StatId, StatsStatus } from '../../types'

const WRONG_COMBOS_FOR_SUGGESTION = 12

const defaultSavedGameData: SavedGameData = {
  discoveriesHistory: [],
  combosHistory: [],
  currentBadges: [],
  currentStats: {},
  personKey: null,
  currentBoards: { discoveries: [], sources: [] },
  suggestionsDisabled: null
}

function parseJson<T>(value: string | null, fallback: T): T {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

function readCardKeysFromBoard(selector: string): CardKey[] {
  return Array.from(document.querySelectorAll(selector))
    .map(cardElement => cardElement.getAttribute('id'))
    .map(cardId => (cardId ? cardId.replace(/^card-/, '') : null))
    .filter((cardKey): cardKey is CardKey => Boolean(cardKey))
}

export default class Game {
  static clearSavedGame(): void {
    localStorage.removeItem(DISCOVERIES_HISTORY_KEY)
    localStorage.removeItem(COMBOS_HISTORY_KEY)
    localStorage.removeItem(BADGES_KEY)
    localStorage.removeItem(STATS_STATUS_KEY)
    localStorage.removeItem(PERSON_KEY)
    localStorage.removeItem(CURRENT_BOARDS_KEY)
    sessionStorage.removeItem(WRONG_COMBO_KEY)
  }

  static updateSuggestionsDisabled(value: string): void {
    sessionStorage.setItem(SUGGESTIONS_DISABLED_KEY, value)
  }

  static checkGameInProgress(): GameState {
    const discoveriesHistory = parseJson<CardKey[]>(localStorage.getItem(DISCOVERIES_HISTORY_KEY), [])
    const combosHistory = parseJson<ComboHistory[]>(localStorage.getItem(COMBOS_HISTORY_KEY), [])
    const currentBadges = parseJson<number[]>(localStorage.getItem(BADGES_KEY), [])
    const currentBoards = parseJson<BoardsState>(localStorage.getItem(CURRENT_BOARDS_KEY), defaultSavedGameData.currentBoards)
    const currentStats = parseJson<StatsStatus>(localStorage.getItem(STATS_STATUS_KEY), {})
    const personKeyRaw = localStorage.getItem(PERSON_KEY)
    const personKey = cardsData.some(card => card.key === personKeyRaw) ? (personKeyRaw as CardKey) : null
    const suggestionsDisabled = sessionStorage.getItem(SUGGESTIONS_DISABLED_KEY)
    const gameInProgress = discoveriesHistory.length > 0 && combosHistory.length > 0
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

  static saveCurrentBoards(): void {
    const currentDiscoveriesBoardKeys = readCardKeysFromBoard('#discoveries-board div.card')
    const currentSourcesBoardKeys = readCardKeysFromBoard('#sources-board div.card')

    localStorage.setItem(
      CURRENT_BOARDS_KEY,
      JSON.stringify({ discoveries: currentDiscoveriesBoardKeys, sources: currentSourcesBoardKeys })
    )
  }

  static saveCombosHistory(newCombosHistory: ComboHistory[]): void {
    localStorage.setItem(COMBOS_HISTORY_KEY, JSON.stringify(newCombosHistory))
  }

  static saveBadges(newBadges: number[]): void {
    localStorage.setItem(BADGES_KEY, JSON.stringify(newBadges))
  }

  static savePerson(personKey: CardKey): void {
    localStorage.setItem(PERSON_KEY, personKey)
  }

  static saveStat(id: StatId, amount: number): void {
    const [, { currentStats }] = Game.checkGameInProgress()
    localStorage.setItem(
      STATS_STATUS_KEY,
      JSON.stringify({
        ...currentStats,
        [id]: amount
      })
    )
  }

  static saveDiscoveries(newDiscoveries: CardKey[]): void {
    localStorage.setItem(DISCOVERIES_HISTORY_KEY, JSON.stringify(newDiscoveries))
  }

  static updateWrongComboNumber(): void {
    const newWrongComboNumber = Number(sessionStorage.getItem(WRONG_COMBO_KEY) || 0) + 1
    const suggestCombination = newWrongComboNumber >= WRONG_COMBOS_FOR_SUGGESTION
    sessionStorage.setItem(WRONG_COMBO_KEY, String(suggestCombination ? 0 : newWrongComboNumber))
    if (suggestCombination) {
      Modal.showCombinationSuggestion()
    }
  }

  static endGame(callback: () => void): void {
    if (window.thirstIntervalId) {
      window.clearInterval(window.thirstIntervalId)
    }
    if (window.animalIntervalId) {
      window.clearInterval(window.animalIntervalId)
    }
    this.clearSavedGame()
    callback()
  }

  static renderInitialCards(personCard: CardData, boardsToResume?: BoardsState): void {
    Card.create({ ...personCard, className: 'person' }, 'person-board', {
      updateDiscoveries: false,
      isInteractive: true
    } satisfies CardConfig)

    const initialCards = boardsToResume?.sources.length
      ? cardsData.filter(card => boardsToResume.sources.includes(card.key))
      : cardsData.filter(card => card.isInitial && !card.isPerson)
    initialCards.forEach(card => Card.create(card, 'sources-board', { updateDiscoveries: false, isInteractive: true }))

    if (boardsToResume?.discoveries.length) {
      const discoveriesCards = cardsData.filter(card => boardsToResume.discoveries.includes(card.key))
      discoveriesCards.forEach(card =>
        Card.create(card, 'discoveries-board', {
          updateDiscoveries: false,
          isInteractive: true
        })
      )
    }
  }

  static startGame(): void {
    Game.clearSavedGame()
    Stats.initiate()
    this.renderInitialCards(cardsData[0])
    setInitialIntervalsAndButtonsOnClick()
  }

  static resumeGame(): void {
    const [, { currentBoards, currentStats, personKey }] = this.checkGameInProgress()
    Stats.initiate(currentStats)
    const currentPerson = cardsData.find(card => card.isPerson && card.key === personKey) || cardsData[0]
    this.renderInitialCards(currentPerson, currentBoards)
    setInitialIntervalsAndButtonsOnClick()
  }
}
