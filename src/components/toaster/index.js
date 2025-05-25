export default class Toaster {
  static display(message, type = 'warning') {
    const toastersWrapper = document.getElementById('toasters-wrapper')
    const currentToasters = Array.from(toastersWrapper.querySelectorAll('.toaster'))
    if (currentToasters.length === 3) return
    const newToaster = document.createElement('div')
    newToaster.textContent = message
    newToaster.classList.add('toaster', `toaster-${type}`)
    toastersWrapper.appendChild(newToaster)
    newToaster.style.bottom = `${75 * (currentToasters.length + 1)}px`
    setTimeout(() => {
      toastersWrapper.removeChild(newToaster)
    }, 2100)
  }
}
