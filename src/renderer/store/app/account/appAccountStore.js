import {v4 as uuid} from 'uuid'
import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    uuid: null,
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
    setAccountUuid: ({commit, state}) => {
      if (state.uuid === null) {
        commit('set', {k: 'uuid', v: uuid()})
      }
    }

  }


}
