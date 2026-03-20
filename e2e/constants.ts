import {
  ANIMAL_INTERVAL_MS,
  MAX_STAT,
  MIN_STAT,
  STAT_CHANGE_SM,
  THIRST_INTERVAL_MS,
  WILD_CHICKEN_SPAWN_DELAY_MS
} from '../src/constants'

export const DRAG_SETTLE_MS = 75
export const INTERVAL_FUZZ_MS = 100
export const TICKS_TO_DEATH = (MAX_STAT - MIN_STAT) / STAT_CHANGE_SM

export const GAME_TIMINGS = {
  thirst: THIRST_INTERVAL_MS,
  wildBull: ANIMAL_INTERVAL_MS,
  wildChicken: WILD_CHICKEN_SPAWN_DELAY_MS
} as const
