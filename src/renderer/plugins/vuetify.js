import '@mdi/font/css/materialdesignicons.css'
import ru from 'vuetify/es5/locale/ru'

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { ru },
    current: 'ru'
  },
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#b32121'
      }
    }

  }
})
