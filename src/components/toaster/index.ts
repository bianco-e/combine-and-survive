import { ToastType, type ToastTypeValue } from '../../types'

export default class Toaster {
  static display(message: string, type: ToastTypeValue = ToastType.Warning): void {
    const toastersWrapper = document.getElementById('toasters-wrapper')
    if (!(toastersWrapper instanceof HTMLElement)) return

    const currentToasters = Array.from(toastersWrapper.querySelectorAll('.toaster'))
    if (currentToasters.length === 3) return

    const newToaster = document.createElement('div')
    newToaster.textContent = message
    newToaster.classList.add('toaster', `toaster-${type}`)
    toastersWrapper.appendChild(newToaster)
    newToaster.style.bottom = `${75 * (currentToasters.length + 1)}px`

    setTimeout(() => {
      if (newToaster.parentElement === toastersWrapper) {
        toastersWrapper.removeChild(newToaster)
      }
    }, 2100)
  }
}
