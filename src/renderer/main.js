import Vue from 'vue'

// Import plugins
import router from '@router'
import store from '@store'

// Import vendor plugins
import vuetify from '@plugins/vuetify'

// Import styles
import '@assets/scss/fonts/_families.scss'

// Import entry component
import App from './App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({

  components: { App },
  router,
  vuetify,
  store,
  template: '<App/>'

}).$mount('#app')
