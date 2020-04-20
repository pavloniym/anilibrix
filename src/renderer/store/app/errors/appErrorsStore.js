import {mutationsHelper} from "@utils/store";

export default {
  namespaced: true,
  state: {
    items: [],
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
    push: ({commit}, error) => commit('push', {k: 'items', v: error}),

    /**
     * Remove error with provided index from errors array
     *
     * @param commit
     * @param state
     * @param index
     */
    shift: ({commit, state}, index) => {
      const items = [...state.items];
      items.splice(index, 1);
      commit('set', {k: 'items', v: items})
    },

  }
}
