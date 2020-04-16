import { mutationsHelper } from '@utils/store'

export default {
  namespaced: true,
  state: {
    process: false
  },
  mutations: {
    ...mutationsHelper
  },

  actions: {

    /**
     * Set process state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setProcess: ({commit}, state) => commit('set', {k: 'process', v: state})


  }
}
