import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    server: {
        type: 'stream'
    },
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
    setTorrentsProcess: ({commit}, state) =>
      commit('set', {k: 'torrents.process', v: state}),

  }
}
