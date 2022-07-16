import Vue from 'vue'
import Vuex from 'vuex'
import Storage from 'electron-store'

import __merge from 'lodash/merge'
import { getInitialState } from '@utils/store/state'
import createPromiseAction from '@plugins/vuex-promise-action'
import createPersistedState from 'vuex-persistedstate'
import { createSharedMutations } from 'vuex-electron'
import { getItem, setItem, removeItem } from '@utils/store/storage'

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
const storage = new Storage({ name: 'anilibrix', clearInvalidConfig: true });

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
  mutations: {

    /**
     * Reset store
     * Replace it with initial values
     * Preserve account details
     *
     * @return void
     */
    RESET_STORE(s) {
      // Get app persisted states
      const account = s.app.account;
      const watch = s.app.watch;

      // Get initial state
      const state = getInitialState(modules);

      // Replace store
      // Merge initial with persisted
      this.replaceState(__merge(state, { app: { account, watch } }));
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
    // eslint-disable-next-line no-return-await
    RESET_STORE: async ({ commit }) => await commit('RESET_STORE')
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
// eslint-disable-next-line no-return-await
export const setUserId = async () => await store.dispatch('app/account/setUserId')

/**
 * Export store
 *
 */
export default store
