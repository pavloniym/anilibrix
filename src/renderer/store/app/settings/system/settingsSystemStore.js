const SET_ADS = 'SET_ADS';
const SET_UPDATES = 'SET_UPDATES';
const TOGGLE_DEVTOOLS = 'TOGGLE_DEVTOOLS';
const SET_ADS_MAXIMUM = 'SET_ADS_MAXIMUM';
const SET_UPDATES_TIMEOUT = 'SET_UPDATES_TIMEOUT';
const SET_SYSTEM_NOTIFICATIONS = 'SET_SYSTEM_NOTIFICATIONS';

export default {
  namespaced: true,
  state: {
    ads: {
      enabled: true,
      maximum: false
    },
    ads__maximum: false,
    devtools: false,
    updates: {
      enabled: true,
      timeout: 10
    },
    notifications: {
      system: true
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
    [SET_UPDATES]: (s, state) => (s.updates.enabled = state),
    /**
     * Set updates timeout
     *
     * @param s
     * @param timeout
     * @return {*}
     */
    [SET_UPDATES_TIMEOUT]: (s, timeout) => (s.updates.timeout = timeout),

    /**
     * Set system notifications
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_SYSTEM_NOTIFICATIONS]: (s, state) => (s.notifications.system = state),

    /**
     * Toggle devtools
     *
     * @param s
     * @return {boolean}
     */
    [TOGGLE_DEVTOOLS]: s => (s.devtools = !s.devtools),

    /**
     * Set ads
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_ADS]: (s, state) => (s.ads.enabled = state),

    /**
     * Set ads maximum
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_ADS_MAXIMUM]: (s, state) => (s.ads.maximum = state)

  },

  actions: {

    /**
     * Set updates state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setUpdates: ({ commit }, state) => commit(SET_UPDATES, state),

    /**
     * Set updates timeout
     *
     * @param commit
     * @param timeout
     * @return {*}
     */
    setUpdatesTimeout: ({ commit }, timeout) => commit(SET_UPDATES_TIMEOUT, timeout),

    /**
     * Set system notifications
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setSystemNotifications: ({ commit }, state) => commit(SET_SYSTEM_NOTIFICATIONS, state),

    /**
     * Toggle devtools
     *
     * @param commit
     * @return {*}
     */
    toggleDevtools: ({ commit }) => commit(TOGGLE_DEVTOOLS),

    /**
     * Set ads
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setAds: ({ commit }, state) => commit(SET_ADS, state),

    /**
     * Set ads maximum
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setAdsMaximum: ({ commit }, state) => commit(SET_ADS_MAXIMUM, state)
  }
}
