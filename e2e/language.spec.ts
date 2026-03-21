import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { CardKey } from '../src/types'
import { dragCard, expectCard, startNewGame } from './helpers'

async function openHelpModal(page: Page): Promise<void> {
  await page.locator('#instructions-button').click()
  await expect(page.locator('#modal.show')).toBeVisible()
}

test.describe('language selector', () => {
  test('auto-selects browser language in instructions modal', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'pt-BR' })
    const page = await context.newPage()

    await page.goto('/')
    await expect(page.locator('button[data-language="pt"]')).toHaveClass(/selected/)
    await expect(page.locator('button[data-language="en"]')).not.toHaveClass(/selected/)
    await expect(page.locator('#modal h1')).toHaveText('Como jogar')

    await context.close()
  })

  test('changing language updates HUD labels and existing source cards', async ({ page }) => {
    await startNewGame(page)
    await openHelpModal(page)

    await page.locator('button[data-language="es"]').click()

    await expect(page.locator('#health .hud-bar-label')).toHaveText('Vida')
    await expect(page.locator('#thirst .hud-bar-label')).toHaveText('Sed')
    await expect(page.locator('#card-person p')).toHaveText('Persona')
    await expect(page.locator('#card-dirt p')).toHaveText('Tierra')
  })

  test('changing language updates already discovered cards', async ({ page }) => {
    await startNewGame(page)
    await dragCard(page, CardKey.PERSON, CardKey.DIRT)
    await expectCard(page, CardKey.CLAY)
    await expectCard(page, CardKey.WORM)

    await openHelpModal(page)
    await page.locator('button[data-language="de"]').click()

    await expect(page.locator('#card-clay p')).toHaveText('Ton')
    await expect(page.locator('#card-worm p')).toHaveText('Wurm')
    await expect(page.locator('button[data-language="de"]')).toHaveClass(/selected/)
  })
})
