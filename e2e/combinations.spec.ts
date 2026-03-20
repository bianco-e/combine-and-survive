import { expect, test } from '@playwright/test'
import { CardKey } from '../src/types'
import { createAxe, dragCard, expectCard, hudAmount, startNewGame } from './helpers'

test.describe('combination outcomes', () => {
  test.beforeEach(async ({ page }) => {
    await startNewGame(page)
  })

  test('successful combination creates result cards', async ({ page }) => {
    await dragCard(page, CardKey.PERSON, CardKey.DIRT)
    await expectCard(page, CardKey.CLAY)
    await expectCard(page, CardKey.WORM)
  })

  test('wrong combination shows warning and adds no discovery', async ({ page }) => {
    await expect(page.locator('#discoveries-board .card')).toHaveCount(0)
    await dragCard(page, CardKey.DIRT, CardKey.TREE)
    await expect(page.locator('.toaster.toaster-warning')).toBeVisible()
    await expect(page.locator('#discoveries-board .card')).toHaveCount(0)
  })

  test('combination that hurts decreases health', async ({ page }) => {
    const before = await hudAmount(page, 'health')
    await dragCard(page, CardKey.PERSON, CardKey.RIVER)
    const after = await hudAmount(page, 'health')
    expect(after).toBeLessThan(before)
  })

  test('idle result keeps non-consumed cards', async ({ page }) => {
    await dragCard(page, CardKey.PERSON, CardKey.RIVER)
    await expectCard(page, CardKey.PERSON)
    await expectCard(page, CardKey.RIVER)
  })

  test('consuming combination removes consumed cards', async ({ page }) => {
    await createAxe(page)
    await dragCard(page, CardKey.PERSON, CardKey.AXE)
    await expect(page.locator(`#card-${CardKey.AXE}`)).toHaveCount(0)
    await expectCard(page, CardKey.AXEMAN)
  })

  test('badge icon appears when earning a badge', async ({ page }) => {
    await createAxe(page)
    await dragCard(page, CardKey.PERSON, CardKey.AXE)
    await expect(page.locator('#new-badge-icon')).toBeVisible()
  })
})
