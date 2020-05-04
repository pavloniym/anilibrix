import {v4 as uuid} from 'uuid'
import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    userId: null,
  },
  mutations: {
    ...mutationsHelper
  },

  actions: {

    /**
     * Set account id
     * Generate random uuid if not exists
     *
     * @param commit
     * @param state
     * @param uuid
     */
    setUserId: ({commit, state}) => {
      if (state.userId === null) {
        commit('set', {k: 'userId', v: uuid()})
      }
    }

  }


}
