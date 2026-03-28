import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import pt from '@/locales/pt'
import es from './locales/es'

const browserLang = navigator.language.split('-')[0]
const supportedLocales = ['en', 'pt','es']
const defaultLocale = supportedLocales.includes(browserLang!) ? browserLang : 'pt'

const i18n = createI18n({
  legacy: false,       
  locale: String(localStorage.getItem('lang')??defaultLocale),
  fallbackLocale: 'pt',
  messages: { en, pt, es },
})

export default i18n