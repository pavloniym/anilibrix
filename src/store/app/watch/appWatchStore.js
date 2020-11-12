// Vue
import Vue from 'vue'

// Utils
import __get from 'lodash/get'

// Getters
export const GET_WATCHED_EPISODE_GETTER = 'GET_WATCHED_EPISODE_GETTER';
export const GET_WATCHED_EPISODES_GETTER = 'GET_WATCHED_EPISODES_GETTER';
export const GET_RELEASE_PROGRESS_GETTER = 'GET_RELEASE_PROGRESS_GETTER';

// Mutations
const SET_WATCHED_EPISODE_MUTATION = 'SET_WATCHED_EPISODE_MUTATION';
const REMOVE_WATCHED_EPISODE_MUTATION = 'REMOVE_WATCHED_EPISODE_MUTATION';

// Actions
export const SET_WATCHED_EPISODE_ACTION = 'SET_WATCHED_EPISODE_ACTION';
export const SET_WATCHED_EPISODES_ACTION = 'SET_WATCHED_EPISODES_ACTION';
export const REMOVE_WATCHED_EPISODE_ACTION = 'REMOVE_WATCHED_EPISODE_ACTION';
export const REMOVE_WATCHED_EPISODES_ACTION = 'REMOVE_WATCHED_EPISODES_ACTION';

export default {
  namespaced: true,
  state: {
    items: {},
  },

  getters: {

    /**
     * Get watched episode data for provided release and episode
     *
     * @param state
     * @return {function({release_id: *, episode_id: *}): *|null}
     */
    [GET_WATCHED_EPISODE_GETTER]: state => ({release_id, episode_id}) => {
      return __get(state, ['items', `${release_id}:${episode_id}`]) || null;
    },


    /**
     * Get watched episodes
     *
     * @param state
     * @param getters
     * @return {function({release_id?: *, total_episodes_number?: *}=): []}
     */
    [GET_WATCHED_EPISODES_GETTER]: (state, getters) => ({release_id = 0, total_episodes_number = 0} = {}) => {

      const watched_episodes = [];

      // Iterate through total episodes number
      for (let i = 1; i <= total_episodes_number; i++) {

        // Try to get episode watch data
        const episode = getters[GET_WATCHED_EPISODE_GETTER]({release_id, episode_id: i});

        // If episode exists and episode is seen
        // Add it to watched episode
        if (episode && episode.is_seen === true) watched_episodes.push(episode);
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
    [GET_RELEASE_PROGRESS_GETTER]: (state, getters) => ({release_id = 0, total_episodes_number = 0} = {}) => {

      // Get release watched episodes
      const watched_episodes = getters[GET_WATCHED_EPISODES_GETTER]({release_id, total_episodes_number});

      // Calculate watched progress percentage
      return total_episodes_number > 0 ? (watched_episodes.length / total_episodes_number) * 100 : 0;
    }

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
    [SET_WATCHED_EPISODE_MUTATION]: (s, {k, v}) => Vue.set(s.items, k, v),


    /**
     * Remove data
     *
     * @param s
     * @param k
     */
    [REMOVE_WATCHED_EPISODE_MUTATION]: (s, k) => Vue.delete(s.items, k),

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
    [SET_WATCHED_EPISODE_ACTION]: ({commit, getters}, {time, release_id, episode_id, percentage}) => {
      if (release_id > -1 && episode_id > -1) {

        // Try to get previously watched data for provided episode
        // Create episode watch data object
        const previously_watched = getters[GET_WATCHED_EPISODE_GETTER]({release_id, episode_id});
        const data = {time, percentage, is_seen: false};

        // If isSeen flag is true -> append it to data object
        const previously_seen_state = __get(previously_watched, 'is_seen') || null;

        if (previously_seen_state !== true) {

          // If previous seen state is false
          // Calculate current percentage and set seen flag
          if (percentage >= 85) data.is_seen = true;

        } else {

          // If previous seen state is true
          // Set it to current watched data
          data.is_seen = previously_seen_state;
        }

        // Set local storage data
        commit(SET_WATCHED_EPISODE_MUTATION, {k: `${release_id}:${episode_id}`, v: data});

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
    [REMOVE_WATCHED_EPISODE_ACTION]: ({commit, getters, dispatch}, {release_id, episode_id}) => {
      commit(REMOVE_WATCHED_EPISODE_MUTATION, `${release_id}:${episode_id}`)
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
    [SET_WATCHED_EPISODES_ACTION]: async ({dispatch, getters}, {release_id, episodes}) => {
      if (release_id && episodes && episodes.length > 0) {

        await Promise.allSettled(
          episodes.map(episode => {

            const episode_id = episode.id;
            const watched_episode = getters[GET_WATCHED_EPISODE_GETTER]({release_id, episode_id});
            const watched_episode_is_seen = __get(watched_episode, 'isSeen') || false;

            const payload = {release_id, episode_id, percentage: 100};

            // Check if episode is not marked as seen
            // Set episode as watched
            if (watched_episode_is_seen !== true) dispatch(SET_WATCHED_EPISODE_ACTION, payload);

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
    [REMOVE_WATCHED_EPISODES_ACTION]: async ({dispatch, getters}, {release_id, episodes}) => {
      if (release_id && episodes && episodes.length > 0) {
        await Promise.allSettled(
          episodes.map(episode => {

            // Get episode id
            const episode_id = episode.id;
            const payload = {release_id, episode_id};

            // Run action to remove watched episode
            dispatch(REMOVE_WATCHED_EPISODE_ACTION, payload);

          })
        );
      }
    },

  },
}
