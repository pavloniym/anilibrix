import { mutationsHelper } from '@utils/store'

import profile from './profile'

export default {
  namespaced: true,
  modules: {
    profile
  },
  state: {
    drawer: true,
    component: 'Categories'
  },

  mutations: {
    ...mutationsHelper
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
        v: drawerState
      }),

    setComponent: ({ commit }, component) =>
      commit('set', {
        k: 'component',
        v: component
      })

  }

}
