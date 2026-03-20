declare function gtag(command: string, eventName: string, params?: Record<string, unknown>): void

interface Navigator {
  userLanguage?: string
}

interface Window {
  thirstIntervalId?: number
  animalIntervalId?: number
}
