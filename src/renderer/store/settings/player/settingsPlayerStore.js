import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    type: 'stream',
    stream: {
      quality: 'fhd'
    }

  },

  mutations: {
   ...mutationsHelper
  },


  actions: {

    /**
     * Set default player type
     *
     * @param commit
     * @param type
     * @return {*}
     */
    setPlayerType: ({commit}, type) =>
      commit('set', {k: 'type', v: type}),


    /**
     * Set stream quality
     *
     * @param commit
     * @param quality
     * @return {*}
     */
    setStreamQuality: ({commit}, quality) =>
      commit('set', {k: 'stream.quality', v: quality}),

  }
}
