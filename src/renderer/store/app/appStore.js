import watch from './watch'
import account from './account'
import settings from './settings'

const SET_DRAWER = 'SET_DRAWER';

export default {
  namespaced: true,
  modules: {
    watch,
    account,
    settings
  },

  state: {
    drawer: false,
  },

  mutations: {

    /**
     * Set
     * @param s
     * @param drawer
     * @return {*}
     */
    [SET_DRAWER]: (s, drawer) => s.drawer = drawer,

  },

  actions: {


    /**
     * Set drawer state
     *
     * @param commit
     * @param drawer
     * @param dispatch
     * @return {*}
     */
    setDrawer: ({commit}, drawer) => commit(SET_DRAWER, drawer),

  }
}
