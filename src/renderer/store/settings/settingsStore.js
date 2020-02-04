import { mutationsHelper } from '@utils/store';

export default {
  namespaced: true,
  state: {
    drawer: false,
    component: 'Categories',

  },

  mutations: {
    ...mutationsHelper,
  },

  actions: {

    /**
     * Set drawer state
     *
     * @param commit
     * @param drawerState
     * @return {*}
     */
    setDrawer: ({ commit }, drawerState) =>
      commit('set', {
        k: 'drawer',
        v: drawerState,
      }),

  },

};
