const SET_UPDATES = 'SET_UPDATES';
const SET_UPDATES_TIMEOUT = 'SET_UPDATES_TIMEOUT';

export default {
  namespaced: true,
  state: {
    updates: {
      enabled: true,
      timeout: 10
    }
  },


  mutations: {

    /**
     * Set updates state
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_UPDATES]: (s, state) => s.updates.enabled = state,


    /**
     * Set updates timeout
     *
     * @param s
     * @param timeout
     * @return {*}
     */
    [SET_UPDATES_TIMEOUT]: (s, timeout) => s.updates.timeout = timeout,

  },

  actions: {

    /**
     * Set updates state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setUpdates: ({commit}, state) => commit(SET_UPDATES, state),


    /**
     * Set updates timeout
     *
     * @param commit
     * @param timeout
     * @return {*}
     */
    setUpdatesTimeout: ({commit}, timeout) => commit(SET_UPDATES_TIMEOUT, timeout),

  }
}
