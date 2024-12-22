import { seeCurrentCombinations } from '../../combinations'
import i18n from '../../i18n'
import cards from '../../cards'
import { BADGES, BADGES_KEY, COMBOS_HISTORY_KEY, DISCOVERIES_HISTORY_KEY, LANG } from '../../constants'
import Card from '../card'
import { setInitialBoard, startNewGame } from '../../utils'

function checksClickOutside(e) {
  const modal = document.getElementById('modal')
  const clickOutsideModal = !modal.contains(e.target)
  if (clickOutsideModal) {
    Modal.close()
  }
}

export default class Modal {
  static render(modalContent, closeButton = true) {
    const modal = document.getElementById('modal')
    const modalBase = `
      <center>
        ${closeButton ? `<button class='modal-btn close-btn' id='close-modal'>x</button>` : ''}
        ${modalContent}
      </center>
    `
    modal.innerHTML = modalBase
    modal.classList.add('show')
    if (closeButton) {
      document.getElementById('close-modal').addEventListener('click', this.close)
      document.addEventListener('mousedown', checksClickOutside)
    }
  }

  static close() {
    document.getElementById('modal').classList.remove('show')
    document.removeEventListener('mousedown', checksClickOutside)
  }

  static showInstructions({ isInitialInstructions }) {
    const instructionsContent = `
      <h1>${i18n.howToPlay.title[LANG]}</h1>
      <h2>${i18n.howToPlay.line1[LANG]}</h2>
      <h2>${i18n.howToPlay.line2[LANG]}</h2>
      <h2>${i18n.howToPlay.line3[LANG]}</h2>
      <h2>${i18n.howToPlay.line4[LANG]}</h2>
      <h2>${i18n.howToPlay.line5[LANG]}</h2>
      ${isInitialInstructions ? `<button id='play-button'>${i18n.howToPlay.play[LANG]}</button>` : ''}
    `
    Modal.render(instructionsContent, !isInitialInstructions)
    if (isInitialInstructions) {
      document.getElementById('play-button').addEventListener('click', () => {
        startNewGame()
        this.close()
      })
    }
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
    const sortedCards = cards
      .filter(card => !card.isInitial && !card.isPerson)
      .sort((a, b) => a.name[LANG] > b.name[LANG])

    sortedCards.forEach(card =>
      Card.create(card, 'cards-to-get-board', { increaseDiscoveries: false, isInteractive: false })
    )
    const discoveriesHistory = JSON.parse(sessionStorage.getItem(DISCOVERIES_HISTORY_KEY)) || []
    discoveriesHistory.forEach(discoveryId => {
      const cardInBoard = document.querySelector(`#cards-to-get-board [non-interactive-id=card-${discoveryId}]`)
      if (Boolean(cardInBoard)) {
        cardInBoard.classList.add('owned-card')
      }
    })
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
    Modal.render(
      `
      <div>
        <h1>${i18n.wonMsg[LANG]}</h1>
        <p>${i18n.wonParagraph[LANG]}</p>
        <button id='play-again'>${i18n.playAgain[LANG]}</button>
      </div>
    `,
      false
    )
    document.getElementById('play-again').addEventListener('click', () => {
      setInitialBoard()
      startNewGame()
    })
  }

  //TODO: improve this
  static showLost() {
    Modal.render(
      `
      <div>
        <h1>${i18n.lostMsg[LANG]}</h1>
        <p>${i18n.lostParagraph[LANG]}</p>
        <button id='play-again'>${i18n.playAgain[LANG]}</button>
      </div>
    `,
      false
    )
    document.getElementById('play-again').addEventListener('click', () => {
      setInitialBoard()
      startNewGame()
    })
  }
}
