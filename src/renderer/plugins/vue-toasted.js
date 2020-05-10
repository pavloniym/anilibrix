import Vue from 'vue'
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 4000,
  iconPack: 'mdi'
});


export default () => Vue.prototype.$toasted;
