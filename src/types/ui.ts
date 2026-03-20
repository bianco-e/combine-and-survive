export enum ToastType {
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
  Success = 'success'
}

export type ToastTypeValue = 'warning' | 'error' | 'info' | 'success'
export type StatId = 'health' | 'thirst'

export type BadgeMap = Record<number, string>

export interface ModalInstructionsOptions {
  isInitialInstructions: boolean
}

export interface ToastMessage {
  type: ToastTypeValue
  i18nKey: string
}
