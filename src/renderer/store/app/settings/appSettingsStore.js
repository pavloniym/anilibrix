import player from './player'
import system from './system'
import connection from './connection'

const TOGGLE_DEVTOOLS = 'TOGGLE_DEVTOOLS';

export default {
  namespaced: true,
  modules: {
    player,
    system,
    connection,
  },
  state: {
    devtools: false
  },


  mutations: {

    /**
     * Toggle devtools
     *
     * @param s
     * @return {boolean}
     */
    [TOGGLE_DEVTOOLS]: s => s.devtools = !s.devtools
  },


  actions: {

    /**
     * Toggle devtools
     *
     * @param commit
     * @return {*}
     */
    toggleDevtools: ({commit}) => commit(TOGGLE_DEVTOOLS),

  }


}
