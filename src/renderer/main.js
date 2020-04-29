import Vue from 'vue'

// Import plugins
import router from '@router'
import store from '@store'

// Import vendor plugins
import sentry from '@plugins/sentry'
import vuetify from '@plugins/vuetify'

// Import plugins
import '@plugins/plyr'
import '@plugins/vue-toasted'


// Import entry component
import App from './App'

Vue.config.productionTip = false;


// Initialize sentry
sentry({store});


/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  vuetify,
  store,
  template: '<App/>'
}).$mount('#anilibrix');
