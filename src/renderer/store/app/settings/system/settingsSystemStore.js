const SET_UPDATES = 'SET_UPDATES';
const TOGGLE_DEVTOOLS = 'TOGGLE_DEVTOOLS';
const SET_UPDATES_TIMEOUT = 'SET_UPDATES_TIMEOUT';
const SET_SYSTEM_NOTIFICATIONS = 'SET_SYSTEM_NOTIFICATIONS';

export default {
  namespaced: true,
  state: {
    devtools: false,
    updates: {
      enabled: true,
      timeout: 10
    },
    notifications: {
      system: true,
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


    /**
     * Set system notifications
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_SYSTEM_NOTIFICATIONS]: (s, state) => s.notifications.system = state,

    /**
     * Toggle devtools
     *
     * @param s
     * @return {boolean}
     */
    [TOGGLE_DEVTOOLS]: s => s.devtools = !s.devtools

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


    /**
     * Set system notifications
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setSystemNotifications: ({commit}, state) => commit(SET_SYSTEM_NOTIFICATIONS, state),


    /**
     * Toggle devtools
     *
     * @param commit
     * @return {*}
     */
    toggleDevtools: ({commit}) => commit(TOGGLE_DEVTOOLS),

  }
}
