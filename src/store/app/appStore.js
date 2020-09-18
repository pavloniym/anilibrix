import watch from './watch'
import account from './account'
import settings from './settings'

const SET_DRAWER = 'SET_DRAWER';
const SET_SEARCHING = 'SET_SEARCHING';
const RESOLVE_MIGRATION = 'RESOLVE_MIGRATION';

export default {
  namespaced: true,
  modules: {
    watch,
    account,
    settings
  },

  state: {
    drawer: false,
    migrations: [],
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


    /**
     * Resolve new migration to store
     *
     * @param s
     * @param migration
     * @return {number}
     */
    [RESOLVE_MIGRATION]: (s, migration) => s.migrations.push(migration),


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


    /**
     * Resolve migration to state
     *
     * @param state
     * @param commit
     * @param migration
     */
    resolveMigration: ({state, commit}, migration) => {
      if (state.migrations.findIndex(item => item === migration) === -1) {
        commit(RESOLVE_MIGRATION, migration);
      }
    }

  }
}
