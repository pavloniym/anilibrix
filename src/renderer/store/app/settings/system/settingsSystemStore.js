import {generalMutations} from '@utils/store/mutations'

export default {
  namespaced: true,
  state: {
    firebase: {
      sync: true,
    },
    updates: {
      enabled: true,
      timeout: 10
    }
  },


  mutations: {
    ...generalMutations
  },

  actions: {

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
