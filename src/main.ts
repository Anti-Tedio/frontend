import './assets/main.css'

import { createApp, watchEffect } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from '@/router/routes'
import Vue3Lottie from 'vue3-lottie'
import i18n from './i18n'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(i18n)
app.use(pinia)
app.use(router)
app.use(Vue3Lottie)

watchEffect(() => {
  const locale = i18n.global.locale.value
  const messages = i18n.global.messages.value[locale] as any
  document.title = messages?.page?.title || 'Anti Tédio'
})

app.mount('#app')