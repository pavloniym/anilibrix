import Vue from 'vue'
import Router from 'vue-router'

import home from './home'
import player from './player'

Vue.use(Router);

export default new Router({
  routes: [].concat(
    home,
    player
  )
})
