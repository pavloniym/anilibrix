import Vue from 'vue'
import Router from 'vue-router'

import releases from './releases'
import release from './release'
import player from './player'

Vue.use(Router);

export default new Router({
  routes: [].concat(
    releases,
    release,
    player
  )
})
