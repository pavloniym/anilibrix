import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    updates: {
      auto: true,
    }
  },

  mutations: {
    ...mutationsHelper,
  },


  actions: {

    /**
     * Set auto updated state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setUpdatesAutoState: ({commit}, state) =>
      commit('set', {k: 'updates.auto', v: state})


  }
}
