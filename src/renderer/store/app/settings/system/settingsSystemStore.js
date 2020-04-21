import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    errors: [],
    drawer: false,
    updates: {
      enabled: true,
      timeout: 10
    }
  },


  mutations: {
    ...mutationsHelper
  },

  actions: {

    /**
     * Set drawer state
     *
     * @param commit
     * @param dispatch
     * @param state
     * @return {*}
     */
    setDrawer: ({commit, dispatch}, state) => commit('set', {k: 'drawer', v: state}),


    /**
     * Push error
     *
     * @param commit
     * @param error
     * @return {*}
     */
    pushError: ({commit}, error) => commit('push', {k: 'errors', v: error}),

    /**
     * Remove error with provided index from errors array
     *
     * @param commit
     * @param state
     * @param index
     */
    removeError: ({commit, state}, index) => {
      const items = [...state.errors];
      items.splice(index, 1);
      commit('set', {k: 'errors', v: items})
    },

    /**
     * Set updates state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setUpdates: ({commit}, state) => commit('set', {k: 'updates.enabled', v: state}),


    /**
     * Set updates timeout
     *
     * @param commit
     * @param timeout
     * @return {*}
     */
    setUpdatesTimeout: ({commit}, timeout) => commit('set', {k: 'updates.timeout', v: timeout}),

  }
}
