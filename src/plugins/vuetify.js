import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import '@mdi/font/css/materialdesignicons.css'
import ru from 'vuetify/es5/locale/ru'

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
            dark: {primary: '#fff', secondary: '#b32121'}
        }
    }
};


export default new Vuetify(options);
