import { expect, test } from '@playwright/test'
import { CardKey } from '../src/types'
import { GAME_TIMINGS, INTERVAL_FUZZ_MS } from './constants'
import { createAxeman, dragCard, expectCard, hudAmount, startNewGame } from './helpers'

test.describe('timer and callback behaviors', () => {
  test('thirst decreases on interval tick', async ({ page }) => {
    await page.clock.install()
    await startNewGame(page)
    const before = await hudAmount(page, 'thirst')
    await page.clock.fastForward(GAME_TIMINGS.thirst)
    const after = await hudAmount(page, 'thirst')
    expect(after).toBeLessThan(before)
  })

  test('wild bull spawns on animal interval', async ({ page }) => {
    await page.clock.install()
    await startNewGame(page)
    await dragCard(page, CardKey.PERSON, CardKey.DIRT)
    await expect(page.locator(`#card-${CardKey.BULL}`)).toHaveCount(0)
    await page.clock.fastForward(GAME_TIMINGS.wildBull + INTERVAL_FUZZ_MS)
    await expectCard(page, CardKey.BULL)
  })

  test('cave unlocks after torch recipe', async ({ page }) => {
    await startNewGame(page)
    await dragCard(page, CardKey.PERSON, CardKey.MOUNTAIN)
    await dragCard(page, CardKey.ROCK, CardKey.ROCK)
    await dragCard(page, CardKey.TREE, CardKey.SHARPEN_ROCK)
    await dragCard(page, CardKey.PERSON, CardKey.TREE)
    await dragCard(page, CardKey.STICK, CardKey.SAP)
    await expectCard(page, CardKey.TORCH)
    await expectCard(page, CardKey.CAVE)
  })

  test('wild chicken spawns after creating bread crumbs', async ({ page }) => {
    await page.clock.install()
    await startNewGame(page)
    await createAxeman(page)

    await dragCard(page, CardKey.AXEMAN, CardKey.DIRT)
    await page.clock.fastForward(GAME_TIMINGS.wildBull + INTERVAL_FUZZ_MS)
    await expectCard(page, CardKey.BULL)
    await dragCard(page, CardKey.AXEMAN, CardKey.BULL)

    await dragCard(page, CardKey.AXEMAN, CardKey.CLAY)
    await dragCard(page, CardKey.RIVER, CardKey.VESSEL)
    await dragCard(page, CardKey.TREE, CardKey.AXEMAN)
    await dragCard(page, CardKey.AXEMAN, CardKey.APPLE)
    await dragCard(page, CardKey.AXEMAN, CardKey.DIRT)
    await dragCard(page, CardKey.AXEMAN, CardKey.CLAY)
    await dragCard(page, CardKey.VESSEL, CardKey.BONE)
    await dragCard(page, CardKey.SEEDS, CardKey.MORTAR)
    await dragCard(page, CardKey.FLOUR, CardKey.WATER)
    await dragCard(page, CardKey.STICK, CardKey.STICK)
    await dragCard(page, CardKey.DOUGH, CardKey.CAMPFIRE)
    await dragCard(page, CardKey.AXEMAN, CardKey.BREAD)
    await expectCard(page, CardKey.BREAD_CRUMBS)

    await page.clock.fastForward(GAME_TIMINGS.wildChicken)
    await expectCard(page, CardKey.CHICKEN)
    await expect(page.locator(`#card-${CardKey.BREAD_CRUMBS}`)).toHaveCount(0)
  })
})
