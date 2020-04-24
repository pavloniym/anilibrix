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
     * Set release
     *
     * @param commit
     * @param release
     * @return {*}
     */
    setRelease: ({commit}, release) => commit('set', {k: 'release', v: release}),


    /**
     * Set episode
     * Reset time
     *
     * @param commit
     * @param episode
     */
    setEpisode: ({commit}, episode) => commit('set', {k: 'episode', v: episode}),


    /**
     * Clear player data
     *
     * @param commit
     */
    clear: ({commit}) => {
      commit('set', {k: 'time', v: 0});
      commit('set', {k: 'episode', v: -1});
      commit('set', {k: 'release', v: null});
    }

  }
}
