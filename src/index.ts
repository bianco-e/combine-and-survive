import { polyfill } from 'mobile-drag-drop'
import Modal from './components/modal'
import { setInitialBoard } from './utils'
import i18n from './i18n'
import Game from './components/game'

window.addEventListener('load', async () => {
  const browserLanguage = navigator.language || navigator.userLanguage || 'en'
  const language = browserLanguage.split('-')[0] || 'en'
  await i18n.load(language)
  gtag('event', 'set_language', {
    event_category: 'action',
    event_label: 'set_language',
    player_language: language
  })
  polyfill()
  setInitialBoard()
  const [isGameInProgress] = Game.checkGameInProgress()
  if (isGameInProgress) {
    Modal.showResumeGame()
  } else {
    Modal.showInstructions({ isInitialInstructions: true })
  }
})
