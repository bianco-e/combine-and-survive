import combinations, { seeAllCombinations, seeCurrentCombinations } from '../../combinations'
import i18n from '../../i18n'
import cards from '../../cards'
import { BADGES } from '../../constants'
import Card from '../card'
import { setInitialBoard } from '../../utils'
import Stats from '../stats'
import Game from '../game'
import HudBar from '../hud-bar'
import { type CardKey, type ModalInstructionsOptions } from '../../types'

interface LanguageOption {
  code: string
  label: string
  flagCode: string
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', label: 'English', flagCode: 'US' },
  { code: 'pt', label: 'Portuguese', flagCode: 'PT' },
  { code: 'fr', label: 'French', flagCode: 'FR' },
  { code: 'de', label: 'German', flagCode: 'DE' },
  { code: 'es', label: 'Spanish', flagCode: 'ES' }
]

function checksClickOutside(e: MouseEvent): void {
  const modal = document.getElementById('modal')
  if (!(modal instanceof HTMLElement)) return
  const clickTarget = e.target
  const clickOutsideModal = clickTarget instanceof Node && !modal.contains(clickTarget)
  if (clickOutsideModal) {
    Modal.close()
  }
}

function domIdToKey(domId: string | null): CardKey | null {
  if (!domId) return null
  const key = domId.replace(/^card-/, '')
  return cards.some(card => card.key === key) ? (key as CardKey) : null
}

function getBoardKeys(selector: string): CardKey[] {
  return Array.from(document.querySelectorAll(selector))
    .map(cardElement => domIdToKey(cardElement.getAttribute('id')))
    .filter((cardKey): cardKey is CardKey => Boolean(cardKey))
}

function renderLanguageSelector(): string {
  return `
    <div class='language-selector'>
      <h3>${i18n.t('languageSelector.title')}</h3>
      <div class='language-options'>
        ${LANGUAGE_OPTIONS.map(({ code, label, flagCode }) => {
          return `
            <button
              class='language-option ${i18n.language === code ? 'selected' : ''}'
              type='button'
              data-language='${code}'
              title='${label}'
              aria-label='${label}'
            >
              <img src='/images/flags/${flagCode}.svg' alt='${label}' />
            </button>
          `
        }).join('')}
      </div>
    </div>
  `
}

export default class Modal {
  static render(modalContent: string, closeButton = true): void {
    const modal = document.getElementById('modal')
    const overlay = document.getElementById('overlay')
    if (!(modal instanceof HTMLElement) || !(overlay instanceof HTMLElement)) return

    const modalBase = `
      <center>
        ${closeButton ? "<button class='modal-btn close-btn' id='close-modal'>×</button>" : ''}
        ${modalContent}
      </center>
    `
    modal.innerHTML = modalBase
    overlay.classList.add('overlay-show')
    modal.classList.add('show')
    if (closeButton) {
      document.getElementById('close-modal')?.addEventListener('click', this.close)
      document.addEventListener('mousedown', checksClickOutside)
    }
  }

  static close(): void {
    document.getElementById('overlay')?.classList.remove('overlay-show')
    document.getElementById('modal')?.classList.remove('show')
    document.removeEventListener('mousedown', checksClickOutside)
  }

  static showCombinationSuggestion(): void {
    const [, { combosHistory, suggestionsDisabled }] = Game.checkGameInProgress()
    const currentPersonBoardKeys = getBoardKeys('#person-board div.card')
    const currentDiscoveriesBoardKeys = getBoardKeys('#discoveries-board div.card')
    const currentSourcesBoardKeys = getBoardKeys('#sources-board div.card')
    const allBoardKeys = currentPersonBoardKeys.concat(currentDiscoveriesBoardKeys, currentSourcesBoardKeys)

    const combinationSuggestion = combinations.find(combination => {
      return (
        combination.combo.every(cardKey => allBoardKeys.includes(cardKey)) &&
        Array.isArray(combination.result) &&
        combination.result.some(cardKey => !currentDiscoveriesBoardKeys.includes(cardKey)) &&
        !combosHistory.some(comboHistory =>
          comboHistory.combo.some(comboHistoryPart => combination.combo.includes(comboHistoryPart))
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
    document.getElementById(disableSuggestionsId)?.addEventListener('change', e => {
      const checkbox = e.target
      if (!(checkbox instanceof HTMLInputElement)) return
      if (checkbox.checked) {
        Game.updateSuggestionsDisabled(String(checkbox.checked))
      }
    })
    document.getElementById(dismissButtonId)?.addEventListener('click', () => {
      this.close()
    })
    document.getElementById(revealButtonId)?.addEventListener('click', () => {
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
        .filter(card => combinationSuggestion.combo.includes(card.key))
        .forEach(card => {
          Card.create(card, 'suggestion-combo', {
            updateDiscoveries: false,
            isInteractive: false
          })
        })
      if (Array.isArray(combinationSuggestion.result)) {
        cards
          .filter(card => combinationSuggestion.result.includes(card.key))
          .forEach(card => {
            Card.create(card, 'suggestion-results', { updateDiscoveries: false, isInteractive: false })
          })
      }

      gtag('event', 'reveal_suggestion', {
        event_category: 'game',
        event_label: 'reveal_suggestion'
      })
    })
  }

  static showInstructions({ isInitialInstructions }: ModalInstructionsOptions): void {
    const startNewGameButtonId = 'start-new-game-button'
    const instructionsContent = `
      <h1>${i18n.t('howToPlay.title')}</h1>
      <h2>${i18n.t('howToPlay.line1')}</h2>
      <h2>${i18n.t('howToPlay.line2')}</h2>
      <h2>${i18n.t('howToPlay.line3')}</h2>
      <h2>${i18n.t('howToPlay.line4')}</h2>
      <h2>${i18n.t('howToPlay.line5')}</h2>
      ${renderLanguageSelector()}
      <i>(${i18n.t('game.autoSave')})</i>
      ${isInitialInstructions ? `<button id='${startNewGameButtonId}'>${i18n.t('game.startNewGame')}</button>` : ''}
    `
    Modal.render(instructionsContent, !isInitialInstructions)
    document.querySelectorAll('.language-option').forEach(languageOption => {
      languageOption.addEventListener('click', async e => {
        const option = e.currentTarget
        if (!(option instanceof HTMLButtonElement)) return
        const selectedLanguage = option.dataset.language
        if (!selectedLanguage || selectedLanguage === i18n.language) return

        await i18n.load(selectedLanguage)
        Card.refreshTranslations()
        HudBar.refreshLabels()
        gtag('event', 'set_language', {
          event_category: 'action',
          event_label: 'set_language',
          player_language: selectedLanguage
        })
        Modal.showInstructions({ isInitialInstructions })
      })
    })
    if (!isInitialInstructions) {
      gtag('event', 'see_instructions', {
        event_category: 'action',
        event_label: 'see_instructions'
      })
      return
    }
    document.getElementById(startNewGameButtonId)?.addEventListener('click', () => {
      Game.startGame()
      this.close()
      gtag('event', 'game_start', {
        event_category: 'game',
        event_label: 'new_game'
      })
    })
  }

  static showResumeGame(): void {
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

    document.getElementById(startNewGameButtonId)?.addEventListener('click', () => {
      Game.startGame()
      this.close()
      gtag('event', 'game_start', {
        event_category: 'game',
        event_label: 'new_game'
      })
    })

    document.getElementById(resumeGameButtonId)?.addEventListener('click', () => {
      Game.resumeGame()
      this.close()
      gtag('event', 'game_start', {
        event_category: 'game',
        event_label: 'resume_game'
      })
    })
  }

  static showCombinedCards(): void {
    const [, { combosHistory }] = Game.checkGameInProgress()
    const combinedCardsContent = `
      <button id='switch-modal-content'>${i18n.t('combinedCardsModal.switchModalContentButton')}</button>
      <h1>${i18n.t('combinedCardsModal.title')}</h1>
      <h3>${combosHistory.length ? seeCurrentCombinations(combosHistory) : i18n.t('combinedCardsModal.none')}</h3>
    `
    Modal.render(combinedCardsContent)
    document.getElementById('switch-modal-content')?.addEventListener('click', Modal.showCardsToGet)
  }

  static showAllCombinationRecipes(): void {
    const allCombinationsContent = `
      <h1>${i18n.t('allCombinationsModal.title')}</h1>
      ${seeAllCombinations()}
    `
    Modal.render(allCombinationsContent)
  }

  static showCardsToGet(): void {
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
    document.getElementById('switch-modal-content')?.addEventListener('click', Modal.showCombinedCards)
    const sortedCards = cards
      .filter(card => !card.isPerson && !card.isSource)
      .sort((a, b) => i18n.t(`cards.${a.key}`).localeCompare(i18n.t(`cards.${b.key}`)))

    sortedCards.forEach(card => Card.create(card, cardsToGetBoardId, { updateDiscoveries: false, isInteractive: false }))

    const [, { discoveriesHistory }] = Game.checkGameInProgress()
    discoveriesHistory.forEach(discoveryKey => {
      const cardInBoard = document.querySelector(
        `#${cardsToGetBoardId} [non-interactive-id="card-${discoveryKey}"]`
      )
      if (cardInBoard instanceof HTMLElement) {
        cardInBoard.classList.add('owned-card')
      }
    })
  }

  static showBadges(): void {
    const [, { currentBadges }] = Game.checkGameInProgress()
    const badgesContent = `
      <h1>${i18n.t('badges.modalTitle')}</h1>
      ${Object.entries(BADGES)
        .map(([id, badgeKey]) => {
          const hasBadge = currentBadges.includes(parseInt(id, 10))
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

  static showWon(): void {
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
    document.getElementById('play-again')?.addEventListener('click', () => {
      setInitialBoard()
      Game.startGame()
      gtag('event', 'game_start', {
        event_category: 'game',
        event_label: 'restart_after_win'
      })
    })
  }

  static showLost(): void {
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
    document.getElementById('play-again')?.addEventListener('click', () => {
      setInitialBoard()
      Game.startGame()
      gtag('event', 'game_start', {
        event_category: 'game',
        event_label: 'restart_after_lose'
      })
    })
  }
}
