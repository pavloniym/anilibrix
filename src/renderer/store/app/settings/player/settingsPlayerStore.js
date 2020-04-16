import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    source: 'fhd',
  },

  mutations: {
   ...mutationsHelper
  },


  actions: {

    /**
     * Set source
     *
     * @param commit
     * @param source
     * @return {*}
     */
    setSource: ({commit}, source) =>
      commit('set', {k: 'source', v: source}),

  }
}
