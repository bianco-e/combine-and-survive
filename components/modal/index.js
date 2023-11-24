export default class Modal {
  static showInstructions() {
    const modal = document.getElementById('modal')
    const instructionsContent = `
        <center>
            <h1>How to play</h1>
            <h2>Combine & Survive is a strategy game</h2>
            <h2>The goal is to reach the greatest number of discoveries by dragging and dropping cards</h2>
            <h2>• Only 2 cards can be combined at a time in this edition</h2>
            <h2>• Some cards can be combined themselves</h2>
            <h2>• For some cards, the combination order matters so if they do not combine, try it the other way</h2>
            <h2>ENJOY!</h2>
            <button id='close-modal'>CLOSE</button>
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
        <h1>You won!</h1>
        <button id='close-modal'>CLOSE</button>
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
            <h1>You lost!</h1>
            <button id='close-modal'>CLOSE</button>
        </center>
    `
    modal.innerHTML = lostContent
    document.getElementById('close-modal').addEventListener('click', () => window.location.reload())
    modal.classList.add('show')
  }
}
