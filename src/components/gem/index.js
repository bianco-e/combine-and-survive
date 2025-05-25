import i18n from '../../locales/i18n.js'
import { capitalize } from '../../utils.js'

export default class Gem {
  static create(color, rootId, id) {
    const gem = document.createElement('svg')
    gem.setAttribute('id', id)
    const gemContent = `
      <div style="position:relative;">
          <svg width="90" height="90" xmlns="http://www.w3.org/2000/svg">
              <defs>
              <linearGradient id="gem-${id}" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="100%" style="stop-color:${color};stop-opacity:1" />
                  <stop offset="100%" style="stop-color:transparent;stop-opacity:0" />
              </linearGradient>
              <clipPath id="gemClip">
                  <path d="M50,5 L90,30 L75,75 L50,95 L25,75 L10,30 Z" />
              </clipPath>
              </defs>
              
              <path d="M50,5 L90,30 L75,75 L50,95 L25,75 L10,30 Z" fill="url(#gem-${id})" clip-path="url(#gemClip)" />
          </svg>
          <span style="position:absolute;top:30%;left:50%;transform:translateX(-40%);">${capitalize(i18n.t(id))}</span>
          <span id="gem-${id}-offset" style="position:absolute;top:50%;left:50%;transform:translateX(-40%);">100%</span>
      </div>`
    gem.innerHTML = gemContent
    const root = document.getElementById(rootId)
    root.appendChild(gem)
  }

  static updateFill(id, fillPercent) {
    const gemStop = document.querySelector(`#gem-${id} stop`)
    const offsetText = document.querySelector(`#gem-${id}-offset`)
    offsetText.textContent = `${fillPercent}%`

    const currentOffset = gemStop.getAttribute('offset')

    function updateOffset(offsetValue) {
      gemStop.setAttribute('offset', `${offsetValue}%`)
      const action = offsetValue >= fillPercent ? 'DECREASE' : 'INCREASE'
      switch (action) {
        case 'DECREASE':
          return requestAnimationFrame(() => updateOffset(offsetValue - 1))
        case 'INCREASE':
          return requestAnimationFrame(() => updateOffset(offsetValue + 1))
        default:
          return
      }

    }

    updateOffset(parseInt(currentOffset))
  }
}