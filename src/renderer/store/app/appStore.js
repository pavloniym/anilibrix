import watch from './watch'
import account from './account'
import settings from './settings'

import {generalMutations} from "@utils/store/mutations";

const SET_ERROR = 'SET_ERROR';
const SET_DRAWER = 'SET_DRAWER';

export default {
  namespaced: true,
  modules: {
    watch,
    account,
    settings
  },

  state: {
    error: null,
    drawer: false,
  },

  mutations: {

    /**
     * Set error
     *
     * @param s
     * @param error
     * @return {*}
     */
    [SET_ERROR]: (s, error) => s.error = error,

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
     * Set error
     *
     * @param commit
     * @param error
     * @param message
     * @return {*}
     */
    setError: ({commit}, error = null) => {
      commit(SET_ERROR, error);
      commit(SET_ERROR, null);
    },


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
