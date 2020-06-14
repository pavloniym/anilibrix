import watch from './watch'
import account from './account'
import settings from './settings'

const SET_DRAWER = 'SET_DRAWER';
const SET_MAC_OS = 'SET_MAC_OS';
const SET_WINDOWS_OS = 'SET_WINDOWS_OS';
const SET_SEARCHING = 'SET_SEARCHING';
const SET_FULLSCREEN = 'SET_FULLSCREEN';

export default {
  namespaced: true,
  modules: {
    watch,
    account,
    settings
  },

  state: {
    drawer: false,
    is_mac: false,
    is_windows: false,
    is_searching: false,
    is_fullscreen: false,
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
     * Set fullscreen
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_FULLSCREEN]: (s, state) => s.is_fullscreen = state,


    /**
     * Set searching state
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_SEARCHING]: (s, state) => s.is_searching = state,


    /**
     * Set mac os
     * @param s
     * @return {boolean}
     */
    [SET_MAC_OS]: s => s.is_mac = true,


    /**
     * Set windows
     *
     * @param s
     * @return {boolean}
     */
    [SET_WINDOWS_OS]: s => s.is_windows = true,


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
     * Set fullscreen
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setFullscreen: ({commit}, state) => commit(SET_FULLSCREEN, state),


    /**
     * Set searching state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setSearching: ({commit}, state) => commit(SET_SEARCHING, state),


    /**
     * Detect and set OS
     *
     * @param commit
     */
    setOS: ({commit}) => {

      const isMac = process.platform === "darwin";
      const isWindows = !!(process.platform === "win32" || process.platform === "win64");

      if (isMac) commit(SET_MAC_OS);
      if (isWindows) commit(SET_WINDOWS_OS);

    }

  }
}
