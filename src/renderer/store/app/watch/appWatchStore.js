import Vue from 'vue'
import __get from 'lodash/get'

const SET_WATCH_DATA = 'SET_WATCH_DATA';
const REMOVE_WATCH_DATA = 'REMOVE_WATCH_DATA';

export default {
  namespaced: true,
  state: {
    items: {}
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
    [SET_WATCH_DATA]: (s, { k, v }) => Vue.set(s.items, k, v),

    /**
     * Remove data
     *
     * @param s
     * @param k
     */
    [REMOVE_WATCH_DATA]: (s, k) => Vue.delete(s.items, k)
  },

  getters: {

    /**
     * Get watched episode data for provided release and episode
     *
     * @param state
     * @return {function({release_id: *, episode_id: *}): *|null}
     */
    // eslint-disable-next-line camelcase
    getWatchedEpisode: state => ({ release_id, episode_id }) => {
      // eslint-disable-next-line camelcase
      return __get(state, ['items', `${release_id}:${episode_id}`]) || null;
    },

    /**
     * Get watched episodes
     *
     * @param state
     * @param getters
     * @return {function({release_id?: *, total_episodes_number?: *}=): []}
     */
    // eslint-disable-next-line camelcase
    getWatchedEpisodes: (state, getters) => ({ release_id = 0, total_episodes_number = 0 } = {}) => {
      const watchedEpisodes = [];

      // Iterate through total episodes number
      // eslint-disable-next-line camelcase
      for (let i = 1; i <= total_episodes_number; i++) {
        // Try to get episode watch data
        // If episode exists and episode is seen
        // Add it to watched episode
        const episode = getters.getWatchedEpisode({ release_id, episode_id: i });
        if (episode && episode.isSeen === true) watchedEpisodes.push(episode);
      }
      return watchedEpisodes;
    },

    /**
     * Get release total progress
     * Calculate only seen
     *
     * @param state
     * @param getters
     * @return {function({release_id?: *, total_episodes_number?: *}=): number}
     */
    // eslint-disable-next-line camelcase
    getReleaseProgress: (state, getters) => ({ release_id = 0, total_episodes_number = 0 } = {}) => {
      // Get release watched episodes
      // Calculate watched progress percentage
      const watchedEpisodes = getters.getWatchedEpisodes({ release_id, total_episodes_number });
      // eslint-disable-next-line camelcase
      return total_episodes_number > 0
        // eslint-disable-next-line camelcase
        ? (watchedEpisodes.length / total_episodes_number) * 100
        : 0;
    }

  },

  actions: {

    /**
     * Set episode watch data
     *
     * @param commit
     * @param time
     * @param quality
     * @param release_id
     * @param episode_id
     * @param percentage
     * @return {Promise<void>}
     */
    // eslint-disable-next-line camelcase
    setWatchedEpisode: ({ commit, getters, dispatch }, { time, release_id, episode_id, percentage }) => {
      // eslint-disable-next-line camelcase
      if (release_id > -1 && episode_id > -1) {
        // Try to get previously watched data for provided episode
        // Create episode watch data object
        const previouslyWatched = getters.getWatchedEpisode({ release_id, episode_id });
        const data = { time, percentage, isSeen: false };

        // If isSeen flag is true -> append it to data object
        const previouslySeenState = __get(previouslyWatched, 'isSeen') || null;
        if (previouslySeenState !== true) {
          // If previous seen state is false
          // Calculate current percentage and set seen flag
          if (percentage >= 85) data.isSeen = true;
        } else {
          // If previous seen state is true
          // Set it to current watched data
          data.isSeen = previouslySeenState;
        }

        // Set local storage data
        // eslint-disable-next-line camelcase
        commit(SET_WATCH_DATA, { k: `${release_id}:${episode_id}`, v: data });
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
    // eslint-disable-next-line camelcase
    removeWatchedEpisode: ({ commit, getters, dispatch }, { release_id, episode_id }) => {
      // eslint-disable-next-line camelcase
      commit(REMOVE_WATCH_DATA, `${release_id}:${episode_id}`)
    },

    /**
     * Set watched episodes
     *
     * @param dispatch
     * @param getters
     * @param release_id
     * @param episodes
     * @return {Promise<void>}
     */
    // eslint-disable-next-line camelcase
    setWatchedEpisodes: async ({ dispatch, getters }, { release_id, episodes }) => {
      // eslint-disable-next-line camelcase
      if (release_id && episodes && episodes.length > 0) {
        await Promise.allSettled(
          episodes.map(episode => {
            const episodeId = episode.id;
            const watchedEpisode = getters.getWatchedEpisode({ release_id, episode_id: episodeId });
            const watchedEpisodeIsSeen = __get(watchedEpisode, 'isSeen') || false;
            const payload = { release_id, episode_id: episodeId, percentage: 100 };

            // Check if episode is not marked as seen
            // Set episode as watched
            if (watchedEpisodeIsSeen !== true) dispatch('setWatchedEpisode', payload);
          })
        );
      }
    },

    /**
     * Remove watched episodes
     *
     * @param dispatch
     * @param getters
     * @param release_id
     * @param episodes
     * @return {Promise<void>}
     */
    // eslint-disable-next-line camelcase
    removeWatchedEpisodes: async ({ dispatch, getters }, { release_id, episodes }) => {
      // eslint-disable-next-line camelcase
      if (release_id && episodes && episodes.length > 0) {
        await Promise.allSettled(
          episodes.map(episode => {
            const episodeId = episode.id;
            const payload = { release_id, episode_id: episodeId };

            dispatch('removeWatchedEpisode', payload);
          })
        );
      }
    }
  }
}
