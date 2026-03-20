import type { CardKey } from './card'
import type { StatId, ToastMessage } from './ui'

export const IDLE = 'IDLE' as const
export type IdleResult = typeof IDLE

export type StatChange = Partial<Record<StatId, number>>


export interface Combination {
  combo: [CardKey, CardKey]
  result: CardKey[] | IdleResult
  consumes: CardKey[]
  decrease: StatChange | null
  increase: StatChange | null
  badge?: number
  message?: ToastMessage
  callback?: () => void
}

export interface ComboHistory {
  combo: [CardKey, CardKey]
  result: CardKey[]
}
