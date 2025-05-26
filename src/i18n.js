const defaultLanguage = 'en'

const i18n = {
  translations: {},
  language: defaultLanguage,

  async load(lang) {
    try {
      const res = await fetch(`/locales/${lang}.json`)
      this.translations = await res.json()
      this.language = lang
    } catch (e) {
      const res = await fetch(`/locales/${defaultLanguage}.json`)
      this.translations = await res.json()
      this.language = defaultLanguage
    }
  },

  t(key) {
    const keys = key.split('.')
    let result = this.translations

    for (const k of keys) {
      if (result[k] === undefined) {
        return key
      }
      result = result[k]
    }

    return result
  }
}

export default i18n
