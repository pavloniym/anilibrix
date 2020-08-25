// Utils
import __set from 'lodash/set'

// Mutations
const SET_SETTINGS_VALUE = 'SET_SETTINGS_VALUE';


export default {
  namespaced: true,
  state: {
    app: {
      devtools: false,
      notifications: {system: true},
      releases_updates: {enabled: true, timeout: 10},
    },
    ads: {
      enabled: true,
      maximum: false
    },
    player: {
      quality: null,
      upscale: {bold: 6, blur: 2, enabled: false},
      episodes: {order: 'asc'},
      autoplay: {enabled: true},
      torrents: {enabled: false},
      skip_opening: {enabled: false, offset: 30}
    },
  },

  mutations: {

    /**
     * Set settings value
     *
     * @param s
     * @param k
     * @param v
     * @return {Object}
     */
    [SET_SETTINGS_VALUE]: (s, {k, v}) => __set(s, k, v),

  },

  actions: {

    /**
     * Set settings value
     *
     * @param commit
     * @param k
     * @param v
     */
    setSettingsValue: ({commit}, {k, v}) => commit(SET_SETTINGS_VALUE, {k, v})

  }
}
