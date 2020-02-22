import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    release: null,
    type: null,
  },

  mutations: {
    ...mutationsHelper
  },

  actions: {

    /**
     * Set player data
     *
     * @param commit
     * @param name
     * @param episode
     */
    setPlayerData: ({commit, state}, {release, type = 'stream'}) => {
      return new Promise(resolve => {
        commit('set', {k: 'release', v: release});
        commit('set', {k: 'type', v: type});
        resolve(state);
      })
    },


    /**
     * Clear player data
     *
     * @param commit
     */
    clearPlayerData: ({commit}) => {
      commit('set', {k: 'release', v: null});
      commit('set', {k: 'type', v: null});
    }

  }
}
