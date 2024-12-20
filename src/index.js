import { polyfill } from 'mobile-drag-drop'
import Modal from './components/modal/index.js'
import { setInitialBoard } from './utils.js'

window.addEventListener('load', () => {
  polyfill()
  setInitialBoard()
  Modal.showInstructions({ isInitialInstructions: true })
})
