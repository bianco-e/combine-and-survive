import i18n from '../../i18n'
import type { StatId } from '../../types'

export default class HudBar {
  static create(rootId: string, id: StatId, icon: string): void {
    const hudBar = document.createElement('div')
    hudBar.setAttribute('id', id)
    const hudBarContent = `
       <div class='hud-bar'>
        <div class='hud-bar-label ${id}'>${i18n.t(id)}</div>
        <div class='hud-bar-track'>
          <span class='hud-bar-icon'>${icon}</span>
          <div class='hud-bar-fill hud-bar-fill-${id}'></div>
          <div id='hud-bar-percentage-${id}' class='hud-bar-percentage'>100 %</div>
        </div>
      </div>`
    hudBar.innerHTML = hudBarContent
    const root = document.getElementById(rootId)
    if (!(root instanceof HTMLElement)) return
    root.appendChild(hudBar)
  }

  static updateFill(id: StatId, fillNumber: number): void {
    const hudBarTextElement = document.getElementById(`hud-bar-percentage-${id}`)
    const hudBarFill = document.querySelector(`.hud-bar-fill-${id}`)
    if (!(hudBarTextElement instanceof HTMLElement) || !(hudBarFill instanceof HTMLElement)) return
    hudBarTextElement.textContent = `${fillNumber} %`
    hudBarFill.style.width = `${fillNumber}%`
  }
}
