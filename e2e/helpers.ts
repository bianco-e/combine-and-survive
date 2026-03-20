import { expect, type Page } from '@playwright/test'
import { CardKey, type StatId } from '../src/types'
import { DRAG_SETTLE_MS } from './constants'

export async function startNewGame(page: Page): Promise<void> {
  await page.goto('/')
  await page.evaluate(() => {
    localStorage.clear()
    sessionStorage.clear()
  })
  await page.reload()
  await page.locator('#start-new-game-button').click()
  await expectCard(page, CardKey.PERSON)
  await expectCard(page, CardKey.DIRT)
}

export async function dragCard(page: Page, fromKey: CardKey, toKey: CardKey): Promise<void> {
  if (fromKey === toKey) {
    await page.evaluate((key: CardKey) => {
      const card = document.getElementById(`card-${key}`)
      if (!(card instanceof HTMLElement)) return
      const transfer = new DataTransfer()
      transfer.setData('text/plain', key)
      card.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer: transfer }))
      card.dispatchEvent(new DragEvent('drop', { bubbles: true, dataTransfer: transfer }))
    }, fromKey)
  } else {
    await page.dragAndDrop(`#card-${fromKey}`, `#card-${toKey}`)
  }

  await page.waitForTimeout(DRAG_SETTLE_MS)
}

export async function expectCard(page: Page, key: CardKey): Promise<void> {
  await expect(page.locator(`#card-${key}`)).toBeVisible()
}

export async function hudAmount(page: Page, stat: StatId): Promise<number> {
  const value = await page.locator(`#hud-bar-percentage-${stat}`).innerText()
  return parseInt(value, 10)
}

export async function createAxe(page: Page): Promise<void> {
  await dragCard(page, CardKey.PERSON, CardKey.MOUNTAIN)
  await dragCard(page, CardKey.ROCK, CardKey.ROCK)
  await dragCard(page, CardKey.PERSON, CardKey.TREE)
  await dragCard(page, CardKey.STICK, CardKey.SHARPEN_ROCK)
  await expectCard(page, CardKey.AXE)
}

export async function createAxeman(page: Page): Promise<void> {
  await createAxe(page)
  await dragCard(page, CardKey.PERSON, CardKey.AXE)
  await expectCard(page, CardKey.AXEMAN)
}
