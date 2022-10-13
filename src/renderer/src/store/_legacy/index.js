import Vue from 'vue'
import Vuex from 'vuex'
import Storage from 'electron-store'

// Plugins
import createPromiseAction from '@/renderer/src/plugins/vuex-promise-action'
import createPersistedState from 'vuex-persistedstate'
import {createSharedMutations} from 'vuex-electron'
import {getItem, setItem, removeItem} from '@/renderer/src/utils/store/storage'

// Modules
import app from './app'
import release from './release'
import catalog from './catalog'
import releases from './releases'
import favorites from './favorites'
import notifications from './notifications'

Vue.use(Vuex);

const modules = {
    app,
    release,
    catalog,
    releases,
    favorites,
    notifications
};

// Get debug state
// Create storage instance
const debug = process.env.NODE_ENV !== 'production';
const storage = new Storage({name: 'anilibrix', clearInvalidConfig: true});

// Create store instance
const store = new Vuex.Store({
    modules,
    plugins: [
        createPromiseAction(),
        createPersistedState({
            key: 'anilibrix',
            paths: [
                'app',
                'notifications',
                'catalog.filters',
                'favorites.settings'
            ],
            storage: {
                getItem: getItem(storage),
                setItem: setItem(storage),
                removeItem: removeItem(storage)
            }
        }),
        createSharedMutations()
    ],
    strict: debug,

});


/**
 * Export store
 *
 */
export default store
