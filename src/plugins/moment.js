import Vue from 'vue'
import moment from 'moment';

// Import russian locale
import 'moment/locale/ru';

// Set russian locale
moment.locale('ru');

// Set to prototype
Vue.prototype.$moment = moment;
