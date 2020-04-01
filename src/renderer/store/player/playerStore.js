import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    episode: null,
    release: null,
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
    watch: ({commit, state}, {episode, release}) => {
      return new Promise(resolve => {
        commit('set', {k: 'episode', v: episode});
        commit('set', {k: 'release', v: release});
        resolve(state);
      })
    },


    /**
     * Clear player data
     *
     * @param commit
     */
    clear: ({commit}) => {
      commit('set', {k: 'episode', v: null});
      commit('set', {k: 'release', v: null});
      commit('set', {k: 'type', v: null});
    }

  }
}
