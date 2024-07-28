import { seeCurrentCombinations } from '../../combinations'
import i18n from '../../i18n'
import cards from '../../cards'
import { COMBOS_HISTORY_KEY, LANG } from '../../constants'
import Card from '../card'

export default class Modal {
  static showInstructions() {
    const modal = document.getElementById('modal')
    const instructionsContent = `
        <center>
            <button class='modal-btn close-btn' id='close-modal'>x</button>
            <h1>${i18n.howToPlay.title[LANG]}</h1>
            <h2>${i18n.howToPlay.line1[LANG]}</h2>
            <h2>${i18n.howToPlay.line2[LANG]}</h2>
            <h2>${i18n.howToPlay.line3[LANG]}</h2>
            <h2>${i18n.howToPlay.line4[LANG]}</h2>
            <h2>${i18n.howToPlay.line5[LANG]}</h2>
        </center>
    `
    modal.innerHTML = instructionsContent
    document.getElementById('close-modal').addEventListener('click', () => modal.classList.remove('show'))
    modal.classList.add('show')
  }

  static showCombinedCards() {
    const modal = document.getElementById('modal')
    const combosHistory = JSON.parse(sessionStorage.getItem(COMBOS_HISTORY_KEY)) || []
    const combinedCardsContent = `
        <center>
            <button class='modal-btn close-btn' id='close-modal'>x</button>
            <button id='switch-modal-content'>${i18n.combinedCardsModal.switchModalContentButton[LANG]}</button>
            <h1>${i18n.combinedCardsModal.title[LANG]}</h1>
            <h3>${combosHistory.length ? seeCurrentCombinations(combosHistory) : i18n.combinedCardsModal.none[LANG]}</h3>
        </center>
    `
    modal.innerHTML = combinedCardsContent
    document.getElementById('close-modal').addEventListener('click', () => modal.classList.remove('show'))
    document.getElementById('switch-modal-content').addEventListener('click', Modal.showCardsToGet)
    modal.classList.add('show')
  }

  static showCardsToGet() {
    const modal = document.getElementById('modal')
    const possibleCardsContent = `
        <center>
            <button class='modal-btn close-btn' id='close-modal'>x</button>
            <button id='switch-modal-content'>${i18n.cardsToGetModal.switchModalContentButton[LANG]}</button>
            <h1>${i18n.cardsToGetModal.title[LANG]}</h1>
            <div id='cards-to-get-board' class='container'></div>
        </center>`
    modal.innerHTML = possibleCardsContent
    document.getElementById('close-modal').addEventListener('click', () => modal.classList.remove('show'))
    document.getElementById('switch-modal-content').addEventListener('click', Modal.showCombinedCards)
    modal.classList.add('show')
    cards.filter(card => !card.isInitial).forEach(card => Card.create(card, 'cards-to-get-board', { increaseDiscoveries: false, isInteractive: false }))
  }

  //TODO: improve this
  static showWon() {
    const modal = document.getElementById('modal')
    const wonContent = `
    <center>
        <button class='modal-btn close-btn' id='close-modal'>x</button>
        <h1>${i18n.wonMsg[LANG]}</h1>
    </center>
    `
    modal.innerHTML = wonContent
    document.getElementById('close-modal').addEventListener('click', () => window.location.reload())
    modal.classList.add('show')
  }

  //TODO: improve this
  static showLost() {
    const modal = document.getElementById('modal')
    const lostContent = `
        <center>
            <button class='modal-btn close-btn' id='close-modal'>x</button>
            <h1>${i18n.lostMsg[LANG]}</h1>
        </center>
    `
    modal.innerHTML = lostContent
    document.getElementById('close-modal').addEventListener('click', () => window.location.reload())
    modal.classList.add('show')
  }
}
