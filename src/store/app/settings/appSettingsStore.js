// Utils
import __set from 'lodash/set'

// Mutations
const SET_SETTINGS_VALUE = 'SET_SETTINGS_VALUE';


export default {
  namespaced: true,
  state: {
    app: {
      devtools: false,
      notifications: {
        system: true
      },
      releases_updates: {
        timeout: 10,
        is_enabled: true
      },
    },
    ads: {
      is_enabled: true,
      is_maximum: false
    },
    player: {
      quality: null,
      anime4k: {
        bold: 6,
        blur: 2,
        is_enabled: false,
      },
      episodes: {
        order: 'asc'
      },
      autoplay: {
        is_enabled: true
      },
      torrents: {
        is_enabled: false
      },
      skip_opening: {
        offset: 30,
        is_enabled: false,
      }
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
