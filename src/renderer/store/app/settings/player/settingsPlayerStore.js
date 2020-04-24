import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    server: {
        type: 'stream'
    },
    quality: null,
    torrents: {
      process: false,
    }
  },

  mutations: {
   ...mutationsHelper
  },


  actions: {

    /**
     * Set torrents process
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setTorrentsProcess: ({commit}, state) => commit('set', {k: 'torrents.process', v: state}),


    /**
     * Set quality alias
     *
     * @param commit
     * @param quality
     * @return {*}
     */
    setQuality: ({commit}, quality) => commit('set', {k: 'quality', v: quality})

  }
}
