import type { BadgeMap } from './types'

export const LOW_THIRST_WARNING = 15
export const STAT_CHANGE_SM = 5
export const STAT_CHANGE_MD = 15
export const STAT_CHANGE_LG = 25
export const STAT_CHANGE_XL = 40
export const STAT_CHANGE_XXL = 60
export const MAX_STAT = 100
export const MIN_STAT = 0
export const THIRST_INTERVAL_MS = 13_000
export const ANIMAL_INTERVAL_MS = 26_000
export const WILD_CHICKEN_SPAWN_DELAY_MS = 6_500

export const DISCOVERIES_HISTORY_KEY = 'discoveries-history'
export const COMBOS_HISTORY_KEY = 'combos-history'
export const BADGES_KEY = 'current-badges'
export const STATS_STATUS_KEY = 'stats-status'
export const PERSON_KEY = 'person'
export const CURRENT_BOARDS_KEY = 'current-boards'
export const WRONG_COMBO_KEY = 'wrong-combo'
export const SUGGESTIONS_DISABLED_KEY = 'suggestions-disabled'

export const BADGES: BadgeMap = {
  1: 'axeman',
  2: 'fisherman',
  3: 'baker',
  4: 'herbalist',
  5: 'builder',
  6: 'writer',
  7: 'miner'
}
