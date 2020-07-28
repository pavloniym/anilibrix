import Vue from 'vue'

// Import plugins
import store from '@store'
import router from '@router'

// Import vendor plugins
//import sentry from '@plugins/sentry'
//import yandex from '@plugins/vue-yandex-metrika'
import vuetify from '@plugins/vuetify'

// Import plugins
import '@plugins/plyr'
import '@plugins/moment'
import '@plugins/lodash'
import '@plugins/vue-meta'
import '@plugins/vuelidate'
import '@plugins/vue-toasted'
// import '@plugins/vue-electron'

// Import styles
import '@assets/scss/style.scss'


// Import entry component
import App from './App'

Vue.config.productionTip = false;

// Initialize sentry
// Initialize yandex metrika
// Vue.use(sentry, {dsn: process.env.SENTRY_DSN, store, source: 'app'});
// Vue.use(yandex, {id: process.env.YANDEX_TRACKING_ID, store, router});


/* eslint-disable no-new */
new Vue({store, router, vuetify, render: h => h(App)}).$mount('#anilibrix');
