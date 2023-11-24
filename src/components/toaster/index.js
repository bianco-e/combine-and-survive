export default class Toaster {
  static display(message, type = 'warning') {
    const toaster = document.getElementById('toaster')
    toaster.textContent = message
    toaster.classList.add(`toaster-${type}`)
    setTimeout(() => {
      toaster.classList.remove(`toaster-${type}`)
    }, 1700)
  }
}
