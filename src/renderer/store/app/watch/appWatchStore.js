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
     * @return {function({release_id?: *, episode_id?: *}=): *|null}
     */
    getWatchData: state => ({release_id = 0, episode_id = 0} = {}) => {
      return __get(state, ['items', `${release_id}:${episode_id}`]) || null;
    },


    /**
     * Get release watched episodes
     *
     * @param state
     * @param getters
     * @return {function({release_id?: *, total_episodes_number?: *}=): []}
     */
    getReleaseWatchedEpisodes: (state, getters) => ({release_id = 0, total_episodes_number = 0} = {}) => {

      const watched_episodes = [];

      // Iterate through total episodes number
      for (let i = 1; i <= total_episodes_number; i++) {

        // Try to get episode watch data
        const episode = getters.getWatchData({release_id, episode_id: i});

        // If episode exists and episode is seen
        // Add it to watched episode
        if (episode && episode.isSeen === true) {
          watched_episodes.push(episode);
        }
      }

      return watched_episodes;

    },


    /**
     * Get release total progress
     * Calculate only seen
     *
     * @param state
     * @param getters
     * @return {function({release_id?: *, total_episodes_number?: *}=): number}
     */
    getReleaseProgress: (state, getters) => ({release_id = 0, total_episodes_number = 0} = {}) => {

      // Get release watched episodes
      const watched_episodes = getters.getReleaseWatchedEpisodes({release_id, total_episodes_number});

      // Calculate watched progress percentage
      return total_episodes_number > 0
        ? (watched_episodes.length / total_episodes_number) * 100
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
     * @return {Promise<void>}
     */
    setWatchData: async ({commit, getters, dispatch}, {time = 0, releaseId = null, episodeId = -1, percentage = 0} = {}) => {
      if (releaseId && episodeId > -1) {

        // Create episode watch data object
        const data = {time, percentage, isSeen: false};

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
            const watchData = getters.getWatchData({release_id: releaseId, episode_id: episodeId});

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
