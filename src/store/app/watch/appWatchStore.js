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
     * Get watched episode data for provided release and episode
     *
     * @param state
     * @return {function({release_id: *, episode_id: *}): *|null}
     */
    getWatchedEpisode: state => ({release_id, episode_id}) => {
      return __get(state, ['items', `${release_id}:${episode_id}`]) || null;
    },


    /**
     * Get watched episodes
     *
     * @param state
     * @param getters
     * @return {function({release_id?: *, total_episodes_number?: *}=): []}
     */
    getWatchedEpisodes: (state, getters) => ({release_id = 0, total_episodes_number = 0} = {}) => {

      const watched_episodes = [];

      // Iterate through total episodes number
      for (let i = 1; i <= total_episodes_number; i++) {

        // Try to get episode watch data
        // If episode exists and episode is seen
        // Add it to watched episode
        const episode = getters.getWatchedEpisode({release_id, episode_id: i});
        if (episode && episode.isSeen === true) watched_episodes.push(episode);
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
      // Calculate watched progress percentage
      const watched_episodes = getters.getWatchedEpisodes({release_id, total_episodes_number});
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
     * @param time
     * @param quality
     * @param release_id
     * @param episode_id
     * @param percentage
     * @return {Promise<void>}
     */
    setWatchedEpisode: ({commit, getters, dispatch}, {time, release_id, episode_id, percentage}) => {
      if (release_id > -1 && episode_id > -1) {

        // Try to get previously watched data for provided episode
        // Create episode watch data object
        const previously_watched = getters.getWatchedEpisode({release_id, episode_id});
        const data = {time, percentage, isSeen: false};

        // If isSeen flag is true -> append it to data object
        const previously_seen_state = __get(previously_watched, 'isSeen') || null;

        if (previously_seen_state !== true) {

          // If previous seen state is false
          // Calculate current percentage and set seen flag
          if (percentage >= 85) data.isSeen = true;

        } else {

          // If previous seen state is true
          // Set it to current watched data
          data.isSeen = previously_seen_state;
        }

        // Set local storage data
        commit(SET_WATCH_DATA, {k: `${release_id}:${episode_id}`, v: data});

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
    removeWatchedEpisode: ({commit, getters, dispatch}, {release_id, episode_id}) => {
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
    setWatchedEpisodes: async ({dispatch, getters}, {release_id, episodes}) => {
      if (release_id && episodes && episodes.length > 0) {

        await Promise.allSettled(
          episodes.map(episode => {

            const episode_id = episode.id;
            const watched_episode = getters.getWatchedEpisode({release_id, episode_id});
            const watched_episode_is_seen = __get(watched_episode, 'isSeen') || false;
            const payload = {release_id, episode_id, percentage: 100};

            // Check if episode is not marked as seen
            // Set episode as watched
            if (watched_episode_is_seen !== true) dispatch('setWatchedEpisode', payload);

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
    removeWatchedEpisodes: async ({dispatch, getters}, {release_id, episodes}) => {
      if (release_id && episodes && episodes.length > 0) {
        await Promise.allSettled(
          episodes.map(episode => {

            const episode_id = episode.id;
            const payload = {release_id, episode_id};

            dispatch('removeWatchedEpisode', payload);

          })
        );
      }
    },

  },
}
