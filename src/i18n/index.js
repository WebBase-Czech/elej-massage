import i18next from 'i18next'
import { ref } from 'vue'
import { resources } from '../locales/texts'

export const supportedLanguages = ['cz', 'en', 'de']

export const currentLanguage = ref('cz')

const i18n = i18next.createInstance()
let initialized = false

export async function initI18n() {
  if (initialized) return

  await i18n.init({
    resources,
    lng: 'cz',
    fallbackLng: 'cz',
    interpolation: { escapeValue: false },
  })

  currentLanguage.value = i18n.language || 'cz'

  i18n.on('languageChanged', lng => {
    currentLanguage.value = lng
  })

  initialized = true
}

export function changeLanguage(lng) {
  if (!supportedLanguages.includes(lng)) return
  return i18n.changeLanguage(lng)
}

export function t(key, options) {
  return i18n.t(key, options)
}

export function tr(key, options) {
  currentLanguage.value
  return i18n.t(key, options)
}