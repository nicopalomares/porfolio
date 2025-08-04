import './assets/styles/base.styl'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'
import vueClickOutsideElement from 'vue-click-outside-element'

const savedLocale = localStorage.getItem('lang') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
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
      contact: {
        title: 'Contact me',
        name: 'Company Name',
        email: 'E-Mail',
        message: 'Message',
        send: 'Send',
        errorEmailMessage: 'Please insert a valid email address',
        succes: 'Message sent successfully',
        error: 'Error sending message',
      },
      about: {
        title: 'About me',
        description:
          "'Hello, my name is Nicolás Palomares, I am 24 years old, and my social media handle is Nickytrip. I am a frontend web developer with over 3 years of experience, and I am passionate about creating dynamic and user-friendly digital experiences. In addition to programming, I have a deep love for music: I compose, produce, and explore sounds as a way to connect with others. I am always excited to learn new technologies and express my creativity through code and music. Find out a little more about me and my story.'",
        resume: 'Resume',
        recomendationLetter: 'Recomendation Letter',
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
      contact: {
        title: 'Kontakt me',
        name: 'Firmenname',
        email: 'E-Mail',
        message: 'Nachricht',
        send: 'Senden',
        errorEmailMessage: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
        succes: 'Nachricht erfolgreich gesendet',
        error: 'Fehler beim Senden der Nachricht',
      },
      about: {
        title: 'Über mich',
        description:
          'Hallo, mein Name ist Nicolás Palomares, ich bin 24 Jahre alt und in den sozialen Netzwerken bin ich unter dem Namen Nickytrip bekannt. Ich bin Frontend-Webentwickler mit mehr als 3 Jahren Erfahrung und meine Leidenschaft ist es, dynamische und benutzerfreundliche digitale Erlebnisse zu schaffen. Neben dem Programmieren habe ich eine tiefe Liebe zur Musik: Ich komponiere, produziere und erforsche Klänge, um mich mit anderen zu verbinden. Ich bin immer begeistert davon, neue Technologien zu lernen und meine Kreativität durch Code und Musik auszudrücken. Erfahren Sie mehr über mich und meine Geschichte.',
        resume: 'Lebenslauf',
        recomendationLetter: 'Empfehlungsschreiben',
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
      contact: {
        title: 'Contactame',
        name: 'Nombre de la empresa',
        email: 'E-Mail',
        message: 'Mensaje',
        send: 'Enviar',
        errorEmailMessage: 'Por favor, inserta una dirección de correo electrónico válida',
        succes: 'Mensaje enviado correctamente',
        error: 'Error al enviar el mensaje',
      },
      about: {
        title: 'Sobre mí',
        description:
          'Hola, me llamo Nicolás Palomares, tengo 24 años y en las redes sociales me llamo Nickytrip. Soy desarrollador web frontend con más de 3 años de experiencia y me apasiona crear experiencias digitales dinámicas y fáciles de usar. Además de la programación, siento un profundo amor por la música: compongo, produzco y exploro sonidos como una forma de conectar con los demás. Siempre me entusiasma aprender nuevas tecnologías y expresar mi creatividad a través del código y la música. Descubre un poco más sobre mí y mi historia.',
        resume: 'CV',
        recomendationLetter: 'Carta de recomendación',
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
// router/index.js o main.js
let historyStack = []
let direction = 'forward'

router.beforeEach((to, from, next) => {
  const toIndex = historyStack.indexOf(to.fullPath)
  const fromIndex = historyStack.indexOf(from.fullPath)

  if (toIndex === -1) {
    historyStack.push(to.fullPath)
    direction = 'forward'
  } else if (toIndex < fromIndex) {
    direction = 'back'
  } else {
    direction = 'forward'
  }
  to.meta.direction = direction // guardamos en meta la dirección
  next()
})
