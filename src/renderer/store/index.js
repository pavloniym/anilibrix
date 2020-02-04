import Vue from 'vue';
import Vuex from 'vuex';

// import { createPersistedState, createSharedMutations } from 'vuex-electron';
import { getInitialState } from '@utils/store';

import settings from './settings';

Vue.use(Vuex);

const modules = {
  settings,
};

const debug = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
  modules,
  plugins: [
    // createPersistedState(),
    // createSharedMutations(),
  ],
  strict: debug,
});


/**
 * Replace store with fresh object
 *
 * @return {*}
 */
const resetStore = () => store.replaceState(getInitialState(modules));


export default store;
export {
  store,
  resetStore,
};
