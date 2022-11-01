import {createApp} from 'vue'

// Import entry component
import App from './App';

// Import plugins
import mitt from '@plugins/mitt'
import plyr from '@plugins/plyr'
import pinia from '@plugins/pinia'
import router from '@plugins/vue-router'
import toasts from '@plugins/vue-toastification'
import vuetify from '@plugins/vuetify'
import vueVirtualScroller from "@plugins/vue-virtual-scroller";

// Import assets
import '@assets/scss/style.scss'

// Create new app
const app = createApp(App);

// Apply plugins
app.use(mitt);
app.use(plyr);
app.use(pinia);
app.use(router);
app.use(toasts);
app.use(vuetify);
app.use(vueVirtualScroller)

// Mount app to DOM
app.mount('#anilibrix');
