import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'
import createPromiseAction from '@plugins/vuex-promise-action'
import { getInitialState } from '@utils/store'

import settings from './settings'
import releases from './releases'
import player from './player'

Vue.use(Vuex);

const modules = {
  settings,
  releases,
  player
};

const debug = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
  modules,
  plugins: [
    createPromiseAction(),
    createPersistedState(),
    createSharedMutations()
  ],
  strict: debug
});

/**
 * Replace store with fresh object
 *
 * @return {*}
 */
const resetStore = () => store.replaceState(getInitialState(modules));

export default store
export {
  store,
  resetStore
}
