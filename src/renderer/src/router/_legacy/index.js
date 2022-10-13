import Vue from 'vue'
import Router from 'vue-router'

// Routes
import ads from './ads/adsRoutes'
import blank from './blank/blankRoutes'
import video from './video/videoRoutes'
import release from './release/releaseRoutes'
import catalog from './catalog/catalogRoutes'
import account from './account/accountRoutes'
import releases from './releases/releasesRoutes'
import favorites from './favorites/favoritesRoutes'

Vue.use(Router);

// Suppress router push errors
// Overwrite native push function
const push = Router.prototype.push;

Router.prototype.push = function (location) {
    push.call(this, location).catch(() => null);
};

const router = new Router({
    routes: [
        ...ads,
        ...blank,
        ...video,
        ...release,
        ...catalog,
        ...account,
        ...releases,
        ...favorites
    ]
});

export default router;
