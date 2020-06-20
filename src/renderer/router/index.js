import Vue from 'vue'
import Router from 'vue-router'

import ads from './ads'
import blank from './blank'
import video from './video'
import release from './release'
import catalog from './catalog'
import releases from './releases'

Vue.use(Router);

const router = new Router({
  routes: [].concat(
    ads,
    blank,
    video,
    release,
    catalog,
    releases,
  ),
  scrollBehavior: (to, from, savedPosition) => savedPosition || ({ x: 0, y: 0 })
});

export default router;
