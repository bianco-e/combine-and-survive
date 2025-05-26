import { seeAllCombinations, seeCurrentCombinations } from '../../combinations'
import i18n from '../../i18n'
import cards from '../../cards'
import { BADGES, BADGES_KEY, COMBOS_HISTORY_KEY, DISCOVERIES_HISTORY_KEY } from '../../constants'
import Card from '../card'
import { setInitialBoard, startNewGame } from '../../utils'
import Stats from '../stats'

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
      <h1>${i18n.t('howToPlay.title')}</h1>
      <h2>${i18n.t('howToPlay.line1')}</h2>
      <h2>${i18n.t('howToPlay.line2')}</h2>
      <h2>${i18n.t('howToPlay.line3')}</h2>
      <h2>${i18n.t('howToPlay.line4')}</h2>
      <h2>${i18n.t('howToPlay.line5')}</h2>
      ${isInitialInstructions ? `<button id='play-button'>${i18n.t('howToPlay.play')}</button>` : ''}
    `
    Modal.render(instructionsContent, !isInitialInstructions)
    if (isInitialInstructions) {
      document.getElementById('play-button').addEventListener('click', () => {
        startNewGame()
        gtag('event', 'game_start', {
          event_category: 'game',
          event_label: 'new_game'
        })
        this.close()
      })
    } else {
      gtag('event', 'see_instructions', {
        event_category: 'action',
        event_label: 'see_instructions',
      })
    }
  }

  static showCombinedCards() {
    const combosHistory = JSON.parse(sessionStorage.getItem(COMBOS_HISTORY_KEY)) || []
    const combinedCardsContent = `
      <button id='switch-modal-content'>${i18n.t('combinedCardsModal.switchModalContentButton')}</button>
      <h1>${i18n.t('combinedCardsModal.title')}</h1>
      <h3>${combosHistory.length ? seeCurrentCombinations(combosHistory) : i18n.t('combinedCardsModal.none')}</h3>
    `
    Modal.render(combinedCardsContent)
    document.getElementById('switch-modal-content').addEventListener('click', Modal.showCardsToGet)
  }

  static showAllCombinationRecipes() {
    const allCombinationsContent = `
      <h1>${i18n.t('allCombinationsModal.title')}</h1>
      ${seeAllCombinations()}
    `
    Modal.render(allCombinationsContent)
  }

  static showCardsToGet() {
    const cardsToGetBoardId = 'cards-to-get-board'
    const possibleCardsContent = `
      <button id='switch-modal-content'>${i18n.t('cardsToGetModal.switchModalContentButton')}</button>
      <h1>${i18n.t('cardsToGetModal.title')}</h1>
      <div id=${cardsToGetBoardId} class='container'></div>
    `
    gtag('event', 'see_cards_to_get', {
      event_category: 'action',
      event_label: 'see_cards_to_get'
    })
    Modal.render(possibleCardsContent)
    document.getElementById('switch-modal-content').addEventListener('click', Modal.showCombinedCards)
    const sortedCards = cards
      .filter(card => !card.isPerson && !card.isSource)
      .sort((a, b) => i18n.t(`cards.${a.key}`) > i18n.t(`cards.${b.key}`))

    sortedCards.forEach(card =>
      Card.create(card, cardsToGetBoardId, { increaseDiscoveries: false, isInteractive: false })
    )
    const discoveriesHistory = JSON.parse(sessionStorage.getItem(DISCOVERIES_HISTORY_KEY)) || []
    discoveriesHistory.forEach(discoveryId => {
      const cardInBoard = document.querySelector(`#${cardsToGetBoardId} [non-interactive-id=card-${discoveryId}]`)
      if (Boolean(cardInBoard)) {
        cardInBoard.classList.add('owned-card')
      }
    })
  }

  static showBadges() {
    const currentBadges = JSON.parse(sessionStorage.getItem(BADGES_KEY)) || []
    const badgesContent = `
      <h1>${i18n.t('badges.modalTitle')}</h1>
      ${Object.entries(BADGES)
        .map(([id, badgeKey]) => {
          const hasBadge = currentBadges.includes(parseInt(id))
          return `
            <h2 class='${hasBadge ? 'completed-badge' : ''}'>${i18n.t(`badges.types.${badgeKey}.name`)}</h2>
            ${hasBadge ? `<p class='badge-description'>${i18n.t(`badges.types.${badgeKey}.msg`)}</p>` : ''}
          `
        })
        .join('')}
    `
    gtag('event', 'see_badges', {
      event_category: 'action',
      event_label: 'see_badges'
    })
    Stats.removeNewBadgeIcon()
    Modal.render(badgesContent)
  }

  //TODO: improve this
  static showWon() {
    gtag('event', 'game_status', {
      event_category: 'game',
      event_label: 'win'
    })
    Modal.render(
      `
      <div>
        <h1>${i18n.t('wonMsg')}</h1>
        <p>${i18n.t('wonParagraph')}</p>
        <button id='play-again'>${i18n.t('playAgain')}</button>
      </div>
    `,
      false
    )
    document.getElementById('play-again').addEventListener('click', () => {
      setInitialBoard()
      startNewGame()
      gtag('event', 'game_start', {
        event_category: 'game',
        event_label: 'restart_after_win'
      })
    })
  }

  //TODO: improve this
  static showLost() {
    gtag('event', 'game_status', {
      event_category: 'game',
      event_label: 'lose'
    })
    Modal.render(
      `
      <div>
        <h1>${i18n.t('lostMsg')}</h1>
        <p>${i18n.t('lostParagraph')}</p>
        <button id='play-again'>${i18n.t('playAgain')}</button>
      </div>
    `,
      false
    )
    document.getElementById('play-again').addEventListener('click', () => {
      setInitialBoard()
      startNewGame()
      gtag('event', 'game_start', {
        event_category: 'game',
        event_label: 'restart_after_lose'
      })
    })
  }
}
