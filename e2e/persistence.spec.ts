import { expect, test } from '@playwright/test'
import { CardKey } from '../src/types'
import { TICKS_TO_DEATH } from './constants'
import { dragCard, expectCard, startNewGame } from './helpers'

test.describe('save and resume', () => {
  test('game in progress shows resume modal after reload', async ({ page }) => {
    await startNewGame(page)
    await dragCard(page, CardKey.PERSON, CardKey.DIRT)
    await page.reload()
    await expect(page.locator('#resume-game-button')).toBeVisible()
  })

  test('resume restores discovered cards', async ({ page }) => {
    await startNewGame(page)
    await dragCard(page, CardKey.PERSON, CardKey.DIRT)
    await page.reload()
    await page.locator('#resume-game-button').click()
    await expectCard(page, CardKey.CLAY)
    await expectCard(page, CardKey.WORM)
  })

  test('after losing and starting over, saved state is cleared', async ({ page }) => {
    await startNewGame(page)
    for (let i = 0; i < TICKS_TO_DEATH; i += 1) {
      await dragCard(page, CardKey.PERSON, CardKey.RIVER)
    }
    await page.locator('#play-again').click()
    await page.reload()
    await expect(page.locator('#start-new-game-button')).toBeVisible()
    await expect(page.locator('#resume-game-button')).toHaveCount(0)
  })
})
