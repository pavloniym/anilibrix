import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    errors: [],
    update: {
      isChecking: false,
      isUpToDate: false,
      isAvailable: false,
      isDownloading: false,
      isDownloaded: false
    }
  },

  mutations: {
    ...mutationsHelper
  },

  actions: {

    /**
     * Push error
     *
     * @param commit
     * @param error
     * @return {*}
     */
    pushError: ({commit}, error) =>
      commit('push', {k: 'errors', v: error}),

    /**
     * Remove error with provided index from errors array
     *
     * @param commit
     * @param state
     * @param index
     */
    shiftError: ({commit, state}, index) => {
      const errors = [...state.errors];
      errors.splice(index, 1);
      commit('set', {k: 'errors', v: errors})
    },


    /**
     * Set update is checking state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setUpdateIsCheckingState: ({commit}, state) =>
      commit('set', {k: 'update.isChecking', v: state}),


    /**
     * Set app is up to date state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setUpdateIsUpToDateState: ({commit}, state) =>
      commit('set', {k: 'update.isUpToDate', v: state}),


    /**
     * Set update is available state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setUpdateIsAvailableState: ({commit}, state) =>
      commit('set', {k: 'update.isAvailable', v: state}),


    /**
     * Set update is downloading state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setUpdateIsDownloadingState: ({commit}, state) =>
      commit('set', {k: 'update.isDownloading', v: state}),


    /**
     * Set update is downloaded
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setUpdateIsDownloadedState: ({commit}, state) =>
      commit('set', {k: 'update.isDownloaded', v: state}),


  }
}
