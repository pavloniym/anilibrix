import Vue from 'vue'
import Vuex from 'vuex'

// Utils
import __merge from 'lodash/merge'
import getInitialState from '@utils/store/getInitialState'

// Store Plugins
import createPersistedState from 'vuex-persistedstate'

// Store Modules
import app from './app'
import release from './release'
import catalog from './catalog'
import releases from './releases'
import favorites from './favorites'
import notifications from './notifications'

// Store persisted paths
import {catalogPersisted} from "@store/catalog/catalogStore";

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

// Create store instance
const store = new Vuex.Store({
  modules,
  plugins: [
    createPersistedState({
      key: 'anilibrix',
      paths: [
        'app',
        'notifications',
        'favorites.settings',
        ...catalogPersisted,
      ],
    }),
  ],
  strict: debug,
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
export const setUserId = async () => await store.dispatch('app/account/setUserId');


/**
 * Export store
 *
 */
export default store
