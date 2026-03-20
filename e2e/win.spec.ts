import { expect, test } from '@playwright/test'
import cardsData from '../src/cards'
import {
  BADGES_KEY,
  COMBOS_HISTORY_KEY,
  CURRENT_BOARDS_KEY,
  DISCOVERIES_HISTORY_KEY,
  MAX_STAT,
  PERSON_KEY,
  STATS_STATUS_KEY
} from '../src/constants'
import { CardKey } from '../src/types'

const allDiscoveries = cardsData.filter(card => !card.isPerson && !card.isSource).map(card => card.key)

test('game is won when all discoveries are completed', async ({ page }) => {
  await page.addInitScript(seedData => {
    localStorage.setItem(seedData.keys.discoveries, JSON.stringify(seedData.discoveries))
    localStorage.setItem(seedData.keys.combos, JSON.stringify(seedData.seedCombos))
    localStorage.setItem(seedData.keys.badges, JSON.stringify([]))
    localStorage.setItem(seedData.keys.stats, JSON.stringify(seedData.stats))
    localStorage.setItem(seedData.keys.person, seedData.person)
    localStorage.setItem(
      seedData.keys.boards,
      JSON.stringify(seedData.boards)
    )
  }, {
    discoveries: allDiscoveries,
    seedCombos: [{ combo: [CardKey.PERSON, CardKey.DIRT], result: [CardKey.CLAY, CardKey.WORM] }],
    stats: { health: MAX_STAT, thirst: MAX_STAT },
    person: CardKey.PERSON,
    boards: {
      discoveries: [CardKey.CLAY, CardKey.WORM],
      sources: [CardKey.DIRT, CardKey.TREE, CardKey.RIVER, CardKey.MOUNTAIN]
    },
    keys: {
      discoveries: DISCOVERIES_HISTORY_KEY,
      combos: COMBOS_HISTORY_KEY,
      badges: BADGES_KEY,
      stats: STATS_STATUS_KEY,
      person: PERSON_KEY,
      boards: CURRENT_BOARDS_KEY
    }
  })

  await page.goto('/')
  await page.locator('#resume-game-button').click()

  await expect(page.locator('#play-again')).toHaveCount(1)
  await expect.poll(async () => page.evaluate((key: string) => localStorage.getItem(key), DISCOVERIES_HISTORY_KEY)).toBeNull()
})
