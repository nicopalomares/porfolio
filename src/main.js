import './assets/styles/base.styl'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'
import vueClickOutsideElement from 'vue-click-outside-element'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      home: {
        firstHeadling: 'Building your dreams',
        secondHeadling: 'Software developer & musician',
      },
      language: 'english',
      nav: {
        home: 'Home',
        projects: 'Projects',
        about: 'About me',
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
        home: 'Home',
        projects: 'Projektes',
        about: 'über mich',
        contact: 'kontakt',
      },
    },
    es: {
      home: {
        firstHeadling: 'Construyendo tus sueños',
        secondHeadling: 'Ingeniero de software y músico',
      },
      language: 'spanish',
      nav: {
        home: 'Inicio',
        projects: 'Proyectos',
        about: 'Sobre mí',
        contact: 'Contáctame',
      },
    },
  },
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(vueClickOutsideElement)
app.use(router)
app.use(i18n)
app.use(pinia)
app.mount('#app')
