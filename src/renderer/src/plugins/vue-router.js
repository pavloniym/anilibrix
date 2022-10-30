import {createRouter, createWebHashHistory} from 'vue-router'

// Routes
//import ads from '@router/ads/adsRoutes'
//import blank from '@router/blank/blankRoutes'
//import video from '@router/video/videoRoutes'
//import catalog from '@router/catalog/catalogRoutes'
//import account from '@router/account/accountRoutes'
//import favorites from '@router/favorites/favoritesRoutes'

// Routes
import login from '@router/login/loginRoutes'
import player from '@router/player/playerRoutes'
import search from '@router/search/searchRoutes'
import release from '@router/release/releaseRoutes'
import catalog from '@router/catalog/catalogRoutes'
import releases from '@router/latestReleases/latestReleasesRoutes'
import favorites from '@router/favorites/favoritesRoutes'

export default createRouter({
    routes: [
        // ...ads,
        // ...blank,
        // ...catalog,
        ...login,
        ...search,
        ...player,
        ...catalog,
        ...release,
        ...releases,
        ...favorites,
    ],
    history: createWebHashHistory(),
});
