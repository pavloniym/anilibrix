import { createApp } from 'vue'

// Import entry component
import App from './App.vue';

// Import plugins
import pinia from '@plugins/pinia'
import router from '@plugins/vue-router'
import vuetify from '@plugins/vuetify'

// Create new app
const app = createApp(App);

// Apply plugins
app.use(pinia);
app.use(router);
app.use(vuetify);

// Mount app to DOM
app.mount('#anilibrix')

/*// Import vue
import Vue from 'vue';

// Import entry component
import App from './App.vue';

// Import plugins
import pinia from '@plugins/pinia'
import router from '@plugins/vue-router'
import vuetify from '@plugins/vuetify'

// Import vendor plugins
//import sentry from '@plugins/sentry'
//import yandex from '@plugins/vue-yandex-metrika'


// Import plugins
//import '@plugins/plyr'
//import '@plugins/moment'
//import '@plugins/lodash'
//import '@plugins/vue-meta'
//import '@plugins/vuelidate'
//import '@plugins/vue-toasted'
//import '@plugins/vue-electron'

// Import styles
// import '@assets/scss/style.scss'

// Initialize sentry
// Initialize yandex metrika
//Vue.use(sentry, {dsn: process.env.SENTRY_DSN, store, source: 'app'});
//Vue.use(yandex, {id: process.env.YANDEX_TRACKING_ID, store, router});

export const app = new Vue({
    pinia,
    router,
    vuetify,
    name: 'AniLibrix',
    render: h => h(App)
});

app.$mount('#anilibrix');*/
