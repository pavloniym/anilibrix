import {mutationsHelper} from '@utils/store'

import player from './player'
import connection from './connection'

export default {
  namespaced: true,
  modules: {
    player,
    connection,
  },
  state: {
    drawer: true,
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
    setDrawer: ({commit, dispatch}, drawerState) => commit('set', {k: 'drawer', v: drawerState})

  }

}
