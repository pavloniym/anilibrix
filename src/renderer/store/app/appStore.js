import watch from './watch'
import account from './account'
import settings from './settings'

import {generalMutations} from "@utils/store/mutations";

export default {
  namespaced: true,
  modules: {
    watch,
    account,
    settings
  },

  state: {
    error: null,
    drawer: false,
  },

  mutations: {
    ...generalMutations,
  },

  actions: {


    /**
     * Set error
     *
     * @param commit
     * @param error
     * @param message
     * @return {*}
     */
    setError: ({commit}, error = null) => {
      commit('set', {k: 'error', v: error});
      commit('set', {k: 'error', v: null});
    },


    /**
     * Set drawer state
     *
     * @param commit
     * @param dispatch
     * @param state
     * @return {*}
     */
    setDrawer: ({commit, dispatch}, state) => commit('set', {k: 'drawer', v: state}),

  }
}
