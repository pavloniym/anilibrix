import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    episode: null,
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
     * @param state
     * @param episode
     * @param release
     * @param type
     */
    setPlayerData: ({commit, state}, {episode, release, type = 'stream'}) => {
      return new Promise(resolve => {
        commit('set', {k: 'episode', v: episode});
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
      commit('set', {k: 'episode', v: null});
      commit('set', {k: 'release', v: null});
      commit('set', {k: 'type', v: null});
    }

  }
}
