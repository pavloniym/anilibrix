import Vue from 'vue'

// Import plugins
import router from '@router'
import store from '@store'

// Import vendor plugins
import sentry from '@plugins/sentry'
import vuetify from '@plugins/vuetify'
import analytics from '@plugins/vue-analytics'

// Import plugins
import '@plugins/plyr'
import '@plugins/vue-toasted'

// Import entry component
import App from './App'

Vue.config.productionTip = false;

// Initialize sentry
// Initialize google-analytics
sentry({store, source: 'app'});
//analytics({store, router});

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  vuetify,
  store,
  template: '<App/>'
}).$mount('#anilibrix');
