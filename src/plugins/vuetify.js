import Vue from 'vue'
import Vuetify from 'vuetify/lib'

// Utils
import '@mdi/font/css/materialdesignicons.css'
import ru from 'vuetify/es5/locale/ru'

// package.json
import {meta} from '@package'

Vue.use(Vuetify);

const options = {
  lang: {
    locales: {ru},
    current: 'ru'
  },
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    dark: true,
    themes: {
      dark: {primary: '#fff', secondary: meta.color}
    }
  }
};


export default new Vuetify(options);
