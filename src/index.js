import { polyfill } from 'mobile-drag-drop'
import Modal from './components/modal/index.js'
import { setInitialBoard } from './utils.js'
import i18n from './locales/i18n.js';

window.addEventListener('load', async () => {
  const LANG = (navigator.language || navigator.userLanguage).split('-')[0] || 'en'
  await i18n.load(LANG);

  polyfill()
  setInitialBoard()
  Modal.showInstructions({ isInitialInstructions: true })
})
