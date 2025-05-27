import { polyfill } from 'mobile-drag-drop'
import Modal from './components/modal/index.js'
import { setInitialBoard } from './utils.js'
import i18n from './i18n.js';
import Game from './components/game/index.js';

window.addEventListener('load', async () => {
  const LANG = (navigator.language || navigator.userLanguage).split('-')[0] || 'en'
  await i18n.load(LANG);
  gtag('event', 'set_language', {
    event_category: 'action',
    event_label: 'set_language',
    player_language: LANG
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
