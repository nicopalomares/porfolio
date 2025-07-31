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
          "'Hey, my name is Nicolas Palomares and I go by Nickytrip across social medias. I’m a front-end web developer with over 3 years of experience passionate about creating dynamic and user-friendly digital experiences. Alongside coding, I have a deep love for music — I write, produce and explore sound as a way to connect with others. I'm always excited to learn new technologies and express creativity through both code and music.'",
        resume: 'resume',
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
          'Hallo, mein Name ist Nicolas Palomares und ich werde in den sozialen Medien Nickytrip genannt. Ich bin ein Front-End-Webentwickler mit über 3 Jahren Erfahrung und einer Leidenschaft für die Erstellung dynamischer und benutzerfreundlicher digitaler Erlebnisse. Neben dem Programmieren habe ich eine tiefe Liebe zur Musik - ich schreibe, produziere und erforsche Sound als einen Weg, um mit anderen in Kontakt zu treten. Ich freue mich immer darauf, neue Technologien zu erlernen und meine Kreativität sowohl durch Code als auch durch Musik auszudrücken.',
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
          'Hola, mi nombre es Nicolas Palomares y me hago llamar Nickytrip en las redes sociales. Soy un desarrollador web front-end con más de 3 años de experiencia apasionado por la creación de experiencias digitales dinámicas y fáciles de usar. Además de la programación, tengo un profundo amor por la música - escribo, produzco y exploro el sonido como una forma de conectar con los demás. Siempre me entusiasma aprender nuevas tecnologías y expresar mi creatividad a través del código y la música.',
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
