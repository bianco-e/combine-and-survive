import i18n from '../../i18n'
import { LANG } from '../../utils'

export default class Modal {
  static showInstructions() {
    const modal = document.getElementById('modal')
    const instructionsContent = `
        <center>
            <h1>${i18n.howToPlay.title[LANG]}</h1>
            <h2>${i18n.howToPlay.line1[LANG]}</h2>
            <h2>${i18n.howToPlay.line2[LANG]}</h2>
            <h2>${i18n.howToPlay.line3[LANG]}</h2>
            <h2>${i18n.howToPlay.line4[LANG]}</h2>
            <h2>${i18n.howToPlay.line5[LANG]}</h2>
            <button id='close-modal'>${i18n.close[LANG]}</button>
        </center>
    `
    modal.innerHTML = instructionsContent
    document.getElementById('close-modal').addEventListener('click', () => modal.classList.remove('show'))
    modal.classList.add('show')
  }

  //TODO: improve this
  static showWon() {
    const modal = document.getElementById('modal')
    const wonContent = `
    <center>
        <h1>${i18n.wonMsg[LANG]}</h1>
        <button id='close-modal'>${i18n.close[LANG]}</button>
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
            <h1>${i18n.lostMsg[LANG]}</h1>
            <button id='close-modal'>${i18n.close[LANG]}</button>
        </center>
    `
    modal.innerHTML = lostContent
    document.getElementById('close-modal').addEventListener('click', () => window.location.reload())
    modal.classList.add('show')
  }
}
