import Vue from 'vue'
import __get from 'lodash/get'

const SET_WATCH_DATA = 'SET_WATCH_DATA';
const REMOVE_WATCH_DATA = 'REMOVE_WATCH_DATA';

export default {
  namespaced: true,
  state: {
    items: {},
  },

  mutations: {

    /**
     * Set data
     * Use Vue to keep reactivity
     *
     * @param s
     * @param k
     * @param v
     * @return {*}
     */
    [SET_WATCH_DATA]: (s, {k, v}) => Vue.set(s.items, k, v),


    /**
     * Remove data
     *
     * @param s
     * @param k
     */
    [REMOVE_WATCH_DATA]: (s, k) => Vue.delete(s.items, k),

},


  getters: {

    /**
     * Get data for provided release and episode
     *
     * @param state
     * @return {function({releaseId?: *, episodeId?: *}=): *|null}
     */
    getWatchData: state => ({releaseId = 0, episodeId = 0} = {}) => __get(state, ['items', `${releaseId}:${episodeId}`]) || null,


    /**
     * Get release total progress
     *
     * @param state
     * @param getters
     * @return {function({releaseId?: *, totalEpisodesNumber?: *}=): number}
     */
    getReleaseProgress: (state, getters) => ({releaseId = 0, totalEpisodesNumber = 0} = {}) => {
      const watched_episodes = [];
      for(let i = 1; i <= totalEpisodesNumber; i++){
        watched_episodes.push(getters.getWatchData({releaseId, episodeId: i}))
      }

      return totalEpisodesNumber > 0
        ? (watched_episodes.filter(episode => episode).length / totalEpisodesNumber) * 100
        : 0;
    }

  },

  actions: {


    /**
     * Set episode watch data
     *
     * @param commit
     * @param rootState
     * @param time
     * @param quality
     * @param releaseId
     * @param episodeId
     * @param percentage
     * @param isSeen
     * @return {Promise<void>}
     */
    setWatchData: async ({commit, getters, dispatch}, {time = 0, quality = null, releaseId = null, episodeId = -1, percentage = 0} = {}) => {
      if (releaseId && episodeId > -1) {

        // Create episode watch data object
        const data = {time, quality, percentage};

        // If isSeen flag is true -> append it to data object
        // This is one-way flag, can't be reset by changing time and percentage
        if (percentage >= 85) data.isSeen = true;

        // Set local storage data
        commit(SET_WATCH_DATA, {k: `${releaseId}:${episodeId}`, v: data});

      }
    },


    /**
     * Set watch package data
     *
     * @param dispatch
     * @param getters
     * @param releaseId
     * @param episodes
     * @return {Promise<void>}
     */
    setWatchPackageData: async ({dispatch, getters}, {releaseId = null, episodes = []} = {}) => {
      if (releaseId && episodes && episodes.length > 0) {
        await Promise.allSettled(
          episodes.map(episode => {

            const episodeId = episode.id;
            const watchData = getters.getWatchData({releaseId, episodeId});

            // Check if episode is not marked as seen
            if (!watchData || watchData.isSeen !== true) {
              dispatch('setWatchData', {releaseId, episodeId, percentage: 100})
            }

          })
        );
      }
    },


    /**
     * Remove watch data
     *
     * @param commit
     * @param getters
     * @param dispatch
     * @param releaseId
     * @param episodeId
     * @return {Promise<void>}
     */
    removeWatchData: async ({commit, getters, dispatch}, {releaseId = null, episodeId = -1} = {}) => {
      if (releaseId && episodeId > -1) commit(REMOVE_WATCH_DATA, `${releaseId}:${episodeId}`);
    },


    /**
     * Remove watch package data
     *
     * @param dispatch
     * @param getters
     * @param releaseId
     * @param episodes
     * @return {Promise<void>}
     */
    removeWatchPackageData: async ({dispatch, getters}, {releaseId = null, episodes = []} = {}) => {
      if (releaseId && episodes && episodes.length > 0) {
        await Promise.allSettled(
          episodes.map(episode => dispatch('removeWatchData', {releaseId, episodeId: episode.id}))
        );
      }
    },

  },
}
