import Vue from 'vue'

// Import plugins
import router from '@router'
import store from '@store'

// Import vendor plugins
import sentry from '@plugins/sentry'
import yandex from '@plugins/vue-yandex-metrika'
import vuetify from '@plugins/vuetify'

// Import plugins
import '@plugins/plyr'
import '@plugins/moment'
import '@plugins/lodash'
import '@plugins/vue-meta'
import '@plugins/vue-toasted'
import '@plugins/vue-electron'

// Import styles
import '@assets/scss/style.scss'


// Import entry component
import App from './App'

Vue.config.productionTip = false;

// Initialize sentry
// Initialize yandex metrika
Vue.use(sentry, {dsn: process.env.SENTRY_DSN, store, source: 'app'});
Vue.use(yandex, {id: process.env.YANDEX_TRACKING_ID, store, router});


/* eslint-disable no-new */
const app = new Vue({
  store,
  router,
  vuetify,
  template: '<App/>',
  components: {App},
});

// Mount app to html
app.$mount('#anilibrix');

