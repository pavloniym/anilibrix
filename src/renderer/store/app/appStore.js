import watch from './watch/appWatchStore'
import account from './account/appAccountStore'
import settings from './settings/appSettingsStore'

const SET_DRAWER = 'SET_DRAWER';
const SET_SEARCHING = 'SET_SEARCHING';
const SET_WELCOME_VIEW = 'SET_WELCOME_VIEW';

export default {
  namespaced: true,
  modules: {
    watch,
    account,
    settings
  },

  state: {
    drawer: false,
    welcome_view: null,
    is_searching: false
  },

  mutations: {

    /**
     * Set
     * @param s
     * @param drawer
     * @return {*}
     */
    [SET_DRAWER]: (s, drawer) => (s.drawer = drawer),

    /**
     * Set searching state
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_SEARCHING]: (s, state) => (s.is_searching = state),

    /**
     * Set welcome view
     *
     * @param s
     * @param welcome_view
     */
    [SET_WELCOME_VIEW]: (s, welcomeView) => (s.welcome_view = welcomeView)
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
    setDrawer: ({ commit }, drawer) => commit(SET_DRAWER, drawer),

    /**
     * Set searching state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setSearching: ({ commit }, state) => commit(SET_SEARCHING, state),

    /**
     * Set welcome view
     *
     * @param commit
     * @param welcomeView
     */
    setWelcomeView: ({ commit }, welcomeView) => commit(SET_WELCOME_VIEW, welcomeView)
  }
}
