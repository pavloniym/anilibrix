// Import core
import Vue from 'vue'
import electron from 'electron'

// Import plugins
import store, {setUserId} from '@store'
import router from '@router'

// Migrations
import {migrateDB} from "@/migrations";

// Import vendor plugins
import sentry from '@plugins/sentry'
import yandex from '@plugins/vue-yandex-metrika'
import vuetify from '@plugins/vuetify'

// Import plugins
import '@plugins/plyr'
import '@plugins/moment'
import '@plugins/lodash'
import '@plugins/vue-meta'
import '@plugins/vuelidate'
import '@plugins/vue-toasted'
import '@plugins/vue-electron'
import '@plugins/vue-event-bus'


// Import styles
import '@assets/scss/style.scss'

// Import entry component
import App from './App'

Vue.config.productionTip = false;

// Start app
// Make some store processing
// Render App root component
(async () => {

  // Migrate DB
  // Set user id to store
  await migrateDB({store, electron, vue: Vue});
  await setUserId();


  // Initialize sentry
  // Initialize yandex metrika
  // Vue.use(sentry, {dsn: process.env.SENTRY_DSN, store, source: 'app'});
  // Vue.use(yandex, {id: process.env.YANDEX_TRACKING_ID, store, router});


  /* eslint-disable no-new */
  new Vue({store, router, vuetify, render: h => h(App)}).$mount('#anilibrix');

})();
