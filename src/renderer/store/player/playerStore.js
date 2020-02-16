import { mutationsHelper } from '@utils/store'

export default {
  namespaced: true,
  state: {

    name: null,
    episode: null,
    stream: {
      FHD: null,
      HD: null,
      SD: null
    }

  },

  mutations: {
    ...mutationsHelper
  },

  actions: {

    /**
     * Set title data
     *
     * @param commit
     * @param name
     * @param episode
     */
    setTitleData: ({ commit }, { name, episode }) => {
      commit('set', { k: 'name', v: name });
      commit('set', { k: 'episode', v: episode });
    },

    /**
     * Set player stream data
     *
     * @param commit
     * @param FHD
     * @param HD
     * @param SD
     */
    setStreamData: ({ commit }, { FHD = null, HD = null, SD = null }) => {
      commit('set', { k: 'stream.FHD', v: FHD });
      commit('set', { k: 'stream.HD', v: HD });
      commit('set', { k: 'stream.SD', v: SD });
    },

    /**
     * Clear player data
     *
     * @param commit
     */
    clearPlayerData: ({ commit }) => {
      commit('set', { k: 'name', v: null });
      commit('set', { k: 'episode', v: null });
      commit('set', { k: 'stream.FHD', v: null });
      commit('set', { k: 'stream.HD', v: null });
      commit('set', { k: 'stream.SD', v: null });
    }

  }
}
