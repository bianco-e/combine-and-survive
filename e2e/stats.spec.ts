import { expect, test } from '@playwright/test'
import { CardKey } from '../src/types'
import { GAME_TIMINGS, TICKS_TO_DEATH } from './constants'
import { dragCard, hudAmount, startNewGame } from './helpers'

test.describe('stats and game over', () => {
  test('health bar updates after damaging combination', async ({ page }) => {
    await startNewGame(page)
    const before = await hudAmount(page, 'health')
    await dragCard(page, CardKey.PERSON, CardKey.RIVER)
    const after = await hudAmount(page, 'health')
    expect(after).toBeLessThan(before)
  })

  test('thirst bar increases after a thirst-restoring combination', async ({ page }) => {
    await page.clock.install()
    await startNewGame(page)

    await page.clock.fastForward(GAME_TIMINGS.thirst)
    const reducedThirst = await hudAmount(page, 'thirst')

    await dragCard(page, CardKey.PERSON, CardKey.RIVER)
    const recoveredThirst = await hudAmount(page, 'thirst')
    expect(recoveredThirst).toBeGreaterThan(reducedThirst)
  })

  test('player loses when health reaches zero', async ({ page }) => {
    await startNewGame(page)

    for (let i = 0; i < TICKS_TO_DEATH; i += 1) {
      await dragCard(page, CardKey.PERSON, CardKey.RIVER)
    }

    await expect(page.locator('#play-again')).toBeVisible()
  })

  test('player loses when thirst reaches zero', async ({ page }) => {
    await page.clock.install()
    await startNewGame(page)

    for (let i = 0; i < TICKS_TO_DEATH; i += 1) {
      await page.clock.fastForward(GAME_TIMINGS.thirst)
    }
    await expect.poll(async () => hudAmount(page, 'thirst')).toBe(0)
    await expect(page.locator('#play-again')).toBeVisible()
  })
})
