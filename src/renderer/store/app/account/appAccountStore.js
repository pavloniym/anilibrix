import {v4 as uuid} from 'uuid'

const SET_USER_ID = 'SET_USER_ID';

export default {
  namespaced: true,
  state: {
    userId: null,
  },
  mutations: {

    /**
     * Set user id
     *
     * @param s
     * @param uuid
     * @return {*}
     */
    [SET_USER_ID]: (s, uuid) => s.userId = uuid,

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
        commit(SET_USER_ID, uuid());
      }
    }

  }


}
