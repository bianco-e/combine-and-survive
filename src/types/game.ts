import type { CardKey } from './card'
import type { ComboHistory } from './combination'

export interface BoardsState {
  discoveries: CardKey[]
  sources: CardKey[]
}

export interface StatsStatus {
  health?: number
  thirst?: number
}

export interface SavedGameData {
  discoveriesHistory: CardKey[]
  combosHistory: ComboHistory[]
  currentBadges: number[]
  currentStats: StatsStatus
  personKey: CardKey | null
  currentBoards: BoardsState
  suggestionsDisabled: string | null
}

export type GameState = [boolean, SavedGameData]
