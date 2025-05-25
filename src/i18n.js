const i18n = {
  translations: {},
  language: 'en',

  async load(lang) {
    const res = await fetch(`/locales/${lang}.json`)
    this.translations = await res.json()
    this.language = lang
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
