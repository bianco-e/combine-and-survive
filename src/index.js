import { polyfill } from 'mobile-drag-drop'
import Modal from './components/modal/index.js'

window.addEventListener('load', () => {
  polyfill()
  Modal.showInstructions({ isInitialInstructions: true })
})
