import Vue from 'vue'
import Vuex from 'vuex'

// Utils
import getInitialState from '@utils/store/getInitialState'

// Store Plugins
import createPersistedState from 'vuex-persistedstate'

// Store Modules
import app from './app'
import search from './search'
import release from './release'
import catalog from './catalog'
import releases from './releases'
import favorites from './favorites'
import notifications from './notifications'

// Store persisted paths
import {appPersisted} from "@store/app/appStore";
import {searchPersisted} from "@store/search/searchStore";
import {catalogPersisted} from "@store/catalog/catalogStore";
import {favoritesPersisted} from "@store/favorites/favoritesStore";
import {notificationsPersisted} from "@store/notifications/notificationsStore";

// Actions
import {SET_USERS_ID_ACTION} from "@store/app/account/appAccountStore";


Vue.use(Vuex);

const modules = {
  app,
  search,
  release,
  catalog,
  releases,
  favorites,
  notifications
};

// Get debug state
// Create storage instance
const debug = process.env.NODE_ENV !== 'production';

// Create store instance
const store = new Vuex.Store({
  modules,
  plugins: [
    createPersistedState({
      key: 'anilibrix',
      paths: [
        ...appPersisted,
        ...searchPersisted,
        ...catalogPersisted,
        ...favoritesPersisted,
        ...notificationsPersisted,
      ],
    }),
  ],
  strict: false,  //debug,
  mutations: {

    /**
     * Reset store
     * Replace it with initial values
     * Preserve account details
     *
     * @return void
     */
    RESET_STORE() {
      this.replaceState(getInitialState(modules));
    },


    /**
     * Replace state
     *
     * @param s
     * @param store
     * @constructor
     */
    REPLACE_STORE(s, store) {
      this.replaceState(store);
    }

  },

  actions: {

    /**
     * RESET STORE
     *
     * @param commit
     * @return {Promise<*>}
     * @constructor
     */
    RESET_STORE: async ({commit}) => await commit('RESET_STORE')
  }

});


/**
 * Get store
 *
 * @return {Store<unknown>}
 */
export const getStore = () => store;


/**
 * Set user's id on app startup
 *
 * @return {Promise<any>}
 */
export const setUsersId = async () => await store.dispatch(`app/account/${SET_USERS_ID_ACTION}`);


/**
 * Export store
 *
 */
export default store
