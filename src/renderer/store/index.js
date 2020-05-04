import Vue from 'vue'
import Vuex from 'vuex'

import {getInitialState} from '@utils/store'
import createPromiseAction from '@plugins/vuex-promise-action'
import {createPersistedState, createSharedMutations} from 'vuex-electron'

import app from './app'
import search from './search'
import release from './release'
import firebase from './firebase'
import releases from './releases'
import notifications from './notifications'

import __merge from 'lodash/merge'

Vue.use(Vuex);

const modules = {
  app,
  search,
  release,
  firebase,
  releases,
  notifications
};

const debug = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
  modules,
  plugins: [
    createPromiseAction(),
    createPersistedState({
      invertIgnored: true,
      ignoredPaths: [
        'app',
        'firebase'
      ],
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

      const account = s.app.account;
      const state = getInitialState(modules);

      this.replaceState(__merge(state, {app: {account}}));
    }

  },
  actions: {

    /**
     * Reset store
     *
     */
    RESET_STORE({commit}) {
      return new Promise(resolve => {
        commit('RESET_STORE');
        resolve();
      })
    }

  }
});


// Set user's id on app startup
// Check if not set, to avoid overwrite
store.dispatch('app/account/setUserId');


export default store
