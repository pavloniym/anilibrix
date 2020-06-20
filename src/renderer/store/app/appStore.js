import watch from './watch'
import account from './account'
import settings from './settings'

const SET_DRAWER = 'SET_DRAWER';
const SET_SEARCHING = 'SET_SEARCHING';

export default {
  namespaced: true,
  modules: {
    watch,
    account,
    settings
  },

  state: {
    drawer: false,
    is_searching: false,
  },

  mutations: {

    /**
     * Set
     * @param s
     * @param drawer
     * @return {*}
     */
    [SET_DRAWER]: (s, drawer) => s.drawer = drawer,

    /**
     * Set searching state
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_SEARCHING]: (s, state) => s.is_searching = state,


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


    /**
     * Set searching state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setSearching: ({commit}, state) => commit(SET_SEARCHING, state),

  }
}
