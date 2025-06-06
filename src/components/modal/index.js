import combinations, { seeAllCombinations, seeCurrentCombinations } from '../../combinations'
import i18n from '../../i18n'
import cards from '../../cards'
import { BADGES } from '../../constants'
import Card from '../card'
import { setInitialBoard } from '../../utils'
import Stats from '../stats'
import Game from '../game'

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
        ${closeButton ? `<button class='modal-btn close-btn' id='close-modal'>×</button>` : ''}
        ${modalContent}
      </center>
    `
    modal.innerHTML = modalBase
    document.getElementById('overlay').classList.add('overlay-show')
    modal.classList.add('show')
    if (closeButton) {
      document.getElementById('close-modal').addEventListener('click', this.close)
      document.addEventListener('mousedown', checksClickOutside)
    }
  }

  static close() {
    document.getElementById('overlay').classList.remove('overlay-show')
    document.getElementById('modal').classList.remove('show')
    document.removeEventListener('mousedown', checksClickOutside)
  }

  static showCombinationSuggestion() {
    const [_, { combosHistory, suggestionsDisabled }] = Game.checkGameInProgress()
    const currentPersonBoardIds = Array.from(document.querySelectorAll('#person-board div.card')).map(cardElement =>
      Number(cardElement.getAttribute('id').replace('card-', ''))
    )
    const currentDiscoveriesBoardIds = Array.from(document.querySelectorAll('#discoveries-board div.card')).map(
      cardElement => Number(cardElement.getAttribute('id').replace('card-', ''))
    )
    const currentSourcesBoardIds = Array.from(document.querySelectorAll('#sources-board div.card')).map(cardElement =>
      Number(cardElement.getAttribute('id').replace('card-', ''))
    )
    const allBoardIds = currentPersonBoardIds.concat(currentDiscoveriesBoardIds).concat(currentSourcesBoardIds)
    const combinationSuggestion = combinations.find(combination => {
      return (
        combination.combo.every(cardId => allBoardIds.includes(cardId)) &&
        Array.isArray(combination.result) &&
        combination.result.some(cardId => !currentDiscoveriesBoardIds.includes(cardId)) &&
        !combosHistory.some(comboHistory =>
          comboHistory.combo.some(comboHistoryId => combination.combo.includes(comboHistoryId))
        )
      )
    })
    if (!combinationSuggestion || suggestionsDisabled) return

    const revealButtonId = 'reveal-button'
    const dismissButtonId = 'dismiss-button'
    const disableSuggestionsId = 'suggestions-checkbox'
    const suggestionToRevealContent = `
      <h1>${i18n.t('combinationSuggestionModal.title')}</h1>
      <h2>${i18n.t('combinationSuggestionModal.line1')}</h2>
      <button id='${revealButtonId}'>${i18n.t('combinationSuggestionModal.reveal')}</button>
      <button id='${dismissButtonId}'>${i18n.t('combinationSuggestionModal.dismissSuggestion')}</button>
      <label class='checkbox-label'>
        <input type='checkbox' id='${disableSuggestionsId}' />
        <span>${i18n.t('combinationSuggestionModal.disableSuggestions')}</span>
      </label>
    `
    Modal.render(suggestionToRevealContent, true)
    document.getElementById(disableSuggestionsId).addEventListener('change', (e) => {
      const isChecked = e.target.checked
      if (isChecked) {
        Game.updateSuggestionsDisabled(isChecked)
      }
    })
    document.getElementById(dismissButtonId).addEventListener('click', () => {
      this.close()
    })
    document.getElementById(revealButtonId).addEventListener('click', () => {
      this.close()
      const suggestionContent = `
        <div class='centered-container'>
          <div id='suggestion-combo' class='centered-container'></div>
          <h1>=</h1>
          <div id='suggestion-results' class='centered-container'></div>
        </div>
      `
      Modal.render(suggestionContent, true)
      cards
        .filter(card => combinationSuggestion.combo.includes(card.id))
        .forEach(card => {
          Card.create(card, 'suggestion-combo', {
            updateDiscoveries: false,
            isInteractive: false
          })
        })
      cards
        .filter(card => combinationSuggestion.result.includes(card.id))
        .forEach(card => {
          Card.create(card, 'suggestion-results', { updateDiscoveries: false, isInteractive: false })
        })

      gtag('event', 'reveal_suggestion', {
        event_category: 'game',
        event_label: 'reveal_suggestion'
      })
    })
  }

  static showInstructions({ isInitialInstructions }) {
    const startNewGameButtonId = 'start-new-game-button'
    const instructionsContent = `
      <h1>${i18n.t('howToPlay.title')}</h1>
      <h2>${i18n.t('howToPlay.line1')}</h2>
      <h2>${i18n.t('howToPlay.line2')}</h2>
      <h2>${i18n.t('howToPlay.line3')}</h2>
      <h2>${i18n.t('howToPlay.line4')}</h2>
      <h2>${i18n.t('howToPlay.line5')}</h2>
      <i>(${i18n.t('game.autoSave')})</i>
      ${isInitialInstructions ? `<button id='${startNewGameButtonId}'>${i18n.t('game.startNewGame')}</button>` : ''}
    `
    Modal.render(instructionsContent, !isInitialInstructions)
    if (!isInitialInstructions) {
      gtag('event', 'see_instructions', {
        event_category: 'action',
        event_label: 'see_instructions'
      })
      return
    }
    document.getElementById(startNewGameButtonId).addEventListener('click', () => {
      Game.startGame()
      this.close()
      gtag('event', 'game_start', {
        event_category: 'game',
        event_label: 'new_game'
      })
    })
  }

  static showResumeGame() {
    const startNewGameButtonId = 'start-new-game-button'
    const resumeGameButtonId = 'resume-game-button'
    const resumeGameContent = `
      <h1>${i18n.t('game.welcomeBack')}</h1>
      <h2>${i18n.t('game.gameInProgress')}</h2>
      <i>(${i18n.t('game.autoSave')})</i>
      <div class=''>
        <button id='${resumeGameButtonId}'>${i18n.t('game.resumeGame')}</button>
        <button id='${startNewGameButtonId}'>${i18n.t('game.startNewGame')}</button>
      </div>
    `
    Modal.render(resumeGameContent, false)

    document.getElementById(startNewGameButtonId).addEventListener('click', () => {
      Game.startGame()
      this.close()
      gtag('event', 'game_start', {
        event_category: 'game',
        event_label: 'new_game'
      })
    })

    document.getElementById(resumeGameButtonId).addEventListener('click', () => {
      Game.resumeGame()
      this.close()
      gtag('event', 'game_start', {
        event_category: 'game',
        event_label: 'resume_game'
      })
    })
  }

  static showCombinedCards() {
    const [_, { combosHistory }] = Game.checkGameInProgress()
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
      Card.create(card, cardsToGetBoardId, { updateDiscoveries: false, isInteractive: false })
    )
    const [_, { discoveriesHistory }] = Game.checkGameInProgress()
    discoveriesHistory.forEach(discoveryId => {
      const cardInBoard = document.querySelector(`#${cardsToGetBoardId} [non-interactive-id=card-${discoveryId}]`)
      if (Boolean(cardInBoard)) {
        cardInBoard.classList.add('owned-card')
      }
    })
  }

  static showBadges() {
    const [_, { currentBadges }] = Game.checkGameInProgress()
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
      Game.startGame()
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
      Game.startGame()
      gtag('event', 'game_start', {
        event_category: 'game',
        event_label: 'restart_after_lose'
      })
    })
  }
}
