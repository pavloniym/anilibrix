import {createApp} from 'vue'

// Import entry component
import App from './App';

// Import plugins
import plyr from './plugins/plyr'
import pinia from './plugins/pinia'
import router from './plugins/vue-router'
import vuetify from './plugins/vuetify'

// Import assets
import '@assets/scss/style.scss'

// Create new app
const app = createApp(App);

// Apply plugins
app.use(plyr);
app.use(pinia);
app.use(router);
app.use(vuetify);

// Mount app to DOM
app.mount('#anilibrix');

