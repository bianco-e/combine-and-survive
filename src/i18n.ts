const defaultLanguage = 'en'

interface TranslationRecord {
  [key: string]: string | TranslationRecord
}

interface I18n {
  translations: TranslationRecord
  language: string
  load: (lang: string) => Promise<void>
  t: (key: string) => string
}

function isTranslationRecord(value: string | TranslationRecord | undefined): value is TranslationRecord {
  return typeof value === 'object' && value !== null
}

const i18n: I18n = {
  translations: {},
  language: defaultLanguage,

  async load(lang: string) {
    try {
      const res = await fetch(`/locales/${lang}.json`)
      this.translations = (await res.json()) as TranslationRecord
      this.language = lang
    } catch {
      const res = await fetch(`/locales/${defaultLanguage}.json`)
      this.translations = (await res.json()) as TranslationRecord
      this.language = defaultLanguage
    }
  },

  t(key: string): string {
    const keys = key.split('.')
    let result: string | TranslationRecord | undefined = this.translations

    for (const k of keys) {
      if (!isTranslationRecord(result) || result[k] === undefined) {
        return key
      }
      result = result[k]
    }

    return typeof result === 'string' ? result : key
  }
}

export default i18n
