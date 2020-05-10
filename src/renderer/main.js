import Vue from 'vue'

// Import plugins
import router from '@router'
import store from '@store'

// Import vendor plugins
import sentry from '@plugins/sentry'
import vuetify from '@plugins/vuetify'

// Import plugins
import '@plugins/plyr'
import '@plugins/firebase'
import '@plugins/vue-toasted'

// Import entry component
import App from './App'

Vue.config.productionTip = false;

// Initialize sentry
sentry({store, source: 'app'});

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

