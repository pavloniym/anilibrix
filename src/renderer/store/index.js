import Vue from 'vue'
import Vuex from 'vuex'

import {getInitialState} from '@utils/store'
import createPromiseAction from '@plugins/vuex-promise-action'
import {createPersistedState, createSharedMutations} from 'vuex-electron'

import app from './app'
import search from './search'
import release from './release'
import releases from './releases'
import notifications from './notifications'

import __get from 'lodash/get'
import __merge from 'lodash/merge'

Vue.use(Vuex);

const modules = {
  app,
  search,
  release,
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
      ignoredPaths: ['app'],
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


// Set account uuid
// Check if not set
store.dispatch('app/account/setAccountUuid');


export default store
