import { seeCurrentCombinations } from '../../combinations'
import i18n from '../../i18n'
import cards from '../../cards'
import { BADGES, BADGES_KEY, COMBOS_HISTORY_KEY, LANG } from '../../constants'
import Card from '../card'

export default class Modal {
  static render(modalContent) {
    const modal = document.getElementById('modal')
    const modalBase = `
      <center>
        <button class='modal-btn close-btn' id='close-modal'>x</button>
        ${modalContent}
      </center>
    `
    modal.innerHTML = modalBase
    document.getElementById('close-modal').addEventListener('click', () => modal.classList.remove('show'))
    modal.classList.add('show')
  }

  static showInstructions() {
    const instructionsContent = `
      <h1>${i18n.howToPlay.title[LANG]}</h1>
      <h2>${i18n.howToPlay.line1[LANG]}</h2>
      <h2>${i18n.howToPlay.line2[LANG]}</h2>
      <h2>${i18n.howToPlay.line3[LANG]}</h2>
      <h2>${i18n.howToPlay.line4[LANG]}</h2>
      <h2>${i18n.howToPlay.line5[LANG]}</h2>
    `
    Modal.render(instructionsContent)
  }

  static showCombinedCards() {
    const combosHistory = JSON.parse(sessionStorage.getItem(COMBOS_HISTORY_KEY)) || []
    const combinedCardsContent = `
      <button id='switch-modal-content'>${i18n.combinedCardsModal.switchModalContentButton[LANG]}</button>
      <h1>${i18n.combinedCardsModal.title[LANG]}</h1>
      <h3>${combosHistory.length ? seeCurrentCombinations(combosHistory) : i18n.combinedCardsModal.none[LANG]}</h3>
    `
    Modal.render(combinedCardsContent)
    document.getElementById('switch-modal-content').addEventListener('click', Modal.showCardsToGet)
  }

  static showCardsToGet() {
    const possibleCardsContent = `
      <button id='switch-modal-content'>${i18n.cardsToGetModal.switchModalContentButton[LANG]}</button>
      <h1>${i18n.cardsToGetModal.title[LANG]}</h1>
      <div id='cards-to-get-board' class='container'></div>
    `
    Modal.render(possibleCardsContent)
    document.getElementById('switch-modal-content').addEventListener('click', Modal.showCombinedCards)
    cards
      .filter(card => !card.isInitial)
      .forEach(card => Card.create(card, 'cards-to-get-board', { increaseDiscoveries: false, isInteractive: false }))
  }

  static showBadges() {
    const currentBadges = JSON.parse(sessionStorage.getItem(BADGES_KEY)) || []
    const badgesContent = `
      <h1>${i18n.badges.modalTitle[LANG]}</h1>
      ${Object.entries(BADGES)
        .map(([id, badge]) => {
          const hasBadge = currentBadges.includes(parseInt(id))
          return `<h3 class='${hasBadge ? 'completed-badge' : ''}'>${i18n.badges.types[badge].name[LANG]}</h3>`
        })
        .join('')}
    `
    Modal.render(badgesContent)
  }

  static newBadge(badge) {
    const badgesContent = `
      <h1>${i18n.badges.newBadgeTitle[LANG]}</h1>
      <h2>${i18n.badges.newBadgeSubtitle[LANG]}</h2>
      <h3>${i18n.badges.types[badge].msg[LANG]}</h3>
    `
    Modal.render(badgesContent)
  }

  //TODO: improve this
  static showWon() {
    Modal.render(`<h1>${i18n.wonMsg[LANG]}</h1>`)
  }

  //TODO: improve this
  static showLost() {
    Modal.render(`<h1>${i18n.lostMsg[LANG]}</h1>`)
  }
}
