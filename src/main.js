import './assets/styles/base.styl'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      home: {
        firstHeadling: 'Building your dreams',
        secondHeadling: 'Software developer & musician',
      },
      language: 'english',
      nav: {
        history: 'Building your dreams Software developer & musician',
        about: 'Hello',
        contact: 'Contact me',
      },
    },
    de: {
      home: {
        firstHeadling: 'Bauen Sie Ihre Träume',
        secondHeadling: 'Software developer & musician',
      },
      language: 'deutsch',
      nav: {
        history: 'Building your dreams Software developer & musician',
        about: 'Hello',
        contact: 'Contact me',
      },
    },
  },
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(pinia)
app.mount('#app')
