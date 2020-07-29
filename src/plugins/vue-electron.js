import Vue from 'vue'

// Use vue-electron lib only on desktop builds
if (process.env.IS_DESKTOP) {
  Vue.use(require('vue-electron'));
}

