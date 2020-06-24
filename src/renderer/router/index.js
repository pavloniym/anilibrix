import Vue from 'vue'
import Router from 'vue-router'

import ads from './ads'
import blank from './blank'
import video from './video'
import release from './release'
import catalog from './catalog'
import account from './account'
import releases from './releases'

Vue.use(Router);

const router = new Router({
  routes: [].concat(
    ads,
    blank,
    video,
    release,
    catalog,
    account,
    releases,
  ),
  scrollBehavior(to, from, savedPosition) {

    // Reset scroll position
    // Get container element
    // If exists -> reset top scroll to 0
    // Make 200ms delay, for fade transition
    if (document.getElementById('container')) {
      setTimeout(() => document.getElementById('container').scrollTop = 0, 200);
    }

  }
});

export default router;
