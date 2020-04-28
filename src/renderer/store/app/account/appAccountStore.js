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
    setAccountUUID: ({commit, state}, uuid) => {
      if (state.uuid === null) {
        commit('set', {k: 'uuid', v: uuid})
      }
    }

  }


}
