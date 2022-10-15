import {createRouter, createWebHashHistory} from 'vue-router'

// Routes
//import ads from '@router/ads/adsRoutes'
//import blank from '@router/blank/blankRoutes'
//import video from '@router/video/videoRoutes'
//import catalog from '@router/catalog/catalogRoutes'
//import account from '@router/account/accountRoutes'
//import favorites from '@router/favorites/favoritesRoutes'

// Routes
import search from '@router/search/searchRoutes'
import release from '@router/release/releaseRoutes'
import releases from '@router/releases/releasesRoutes'

export default createRouter({
    routes: [
        // ...ads,
        // ...blank,
        // ...video,
        // ...release,
        // ...catalog,
        // ...account
        // ...favorites
        ...search,
        ...release,
        ...releases,
    ],
    history: createWebHashHistory(),
});
