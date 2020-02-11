import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    errors: [],
  },
  mutations: {
    ...mutationsHelper
  },

  actions: {

    /**
     * Push error
     *
     * @param commit
     * @param error
     * @return {*}
     */
    pushError: ({commit}, error) =>
      commit('push', {k: 'errors', v: error}),


    /**
     * Remove error with provided index from errors array
     *
     * @param commit
     * @param state
     * @param index
     */
    shiftError: ({commit, state}, index) => {
      const errors = [...state.errors];
      errors.splice(index, 1);
      commit('set', {k: 'errors', v: errors})
    }


  },
}
