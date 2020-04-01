import {mutationsHelper} from '@utils/store'

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
     * Add release to notification items
     *
     * @param commit
     * @param release
     * @return {*}
     */
    addRelease: ({commit}, release) =>
      commit('push', {k: 'items', v: release}),


    /**
     * Remove release with provided index
     *
     * @param commit
     * @param state
     * @param index
     */
    removeRelease: ({commit, state}, index) => {

      // Create new copy
      const items = [...state.items];

      // Remove item with provided index
      items.splice(index, 1);

      // Update items
      commit('set', {k: 'items', v: items});
    }


  }

}
