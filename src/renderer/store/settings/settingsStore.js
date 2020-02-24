import {mutationsHelper} from '@utils/store'

import profile from './profile'
import player from './player'
import connection from './connection'

export default {
  namespaced: true,

  modules: {
    profile,
    player,
    connection
  },

  state: {
    drawer: false,
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
     * @param dispatch
     * @param drawerState
     * @return {*}
     */
    setDrawer: ({commit, dispatch}, drawerState) => {
      commit('set', {k: 'drawer', v: drawerState});
      if (drawerState === false) {
        setTimeout(() => dispatch('backToSettingsCategories'), 400)
      }
    },

    /**
     * Set settings component
     *
     * @param commit
     * @param component
     * @return {*}
     */
    setComponent: ({commit}, component) => commit('set', {k: 'component', v: component}),

    /**
     * Reset settings component
     * Set Categories as default component
     *
     * @param commit
     * @return {*}
     */
    backToSettingsCategories: ({commit}) => commit('set', {k: 'component', v: 'Categories'})

  }

}
