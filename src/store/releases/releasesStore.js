// Proxy + Transformers
import ReleaseProxy from "@proxies/release";
import ReleaseTransformer from '@transformers/release'

// Utils
import axios from 'axios'

// Resolvers
import ErrorResolver from "@@/utils/resolvers/error";
import NotificationsResolver from "@@/utils/resolvers/notifications";

// Mutations
const SET_INDEX = 'SET_INDEX';
const SET_RELEASES_DATA = 'SET_RELEASES_DATA';
const SET_RELEASES_LOADING = 'SET_RELEASES_LOADING';
const SET_RELEASES_DATETIME = 'SET_RELEASES_DATETIME';
const SET_RELEASES_HAS_ERROR = 'SET_RELEASES_HAS_ERROR';

// Requests
let REQUEST = null;

export default {
  namespaced: true,
  state: {
    data: [],
    index: null,
    loading: false,
    datetime: null,
    has_error: false,
  },

  mutations: {

    /**
     * Set index
     *
     * @param s
     * @param index
     * @return {*}
     */
    [SET_INDEX]: (s, index) => s.index = index,

    /**
     * Set releases loading
     *
     * @param s
     * @param loading
     * @return {*}
     */
    [SET_RELEASES_LOADING]: (s, loading) => s.loading = loading,


    /**
     * Set releases data
     *
     * @param s
     * @param data
     * @return {*}
     */
    [SET_RELEASES_DATA]: (s, data) => s.data = data,


    /**
     * Set releases datetime
     *
     * @param s
     * @param datetime
     * @return {*}
     */
    [SET_RELEASES_DATETIME]: (s, datetime) => s.datetime = datetime,

    /**
     * Set release has error
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_RELEASES_HAS_ERROR]: (s, state) => s.has_error = state,

  },

  actions: {

    /**
     * Set slider index
     *
     * @param commit
     * @param index
     * @return {*}
     */
    setIndex: ({commit}, index) => commit(SET_INDEX, index),


    /**
     * Get latest releases
     *
     * @param state
     * @param commit
     * @param dispatch
     * @return {Promise<any>}
     */
    async getReleases({commit, dispatch, state}) {
      try {

        // Set loading state
        commit(SET_RELEASES_LOADING, true);
        commit(SET_RELEASES_HAS_ERROR, false);

        // Cancel previous request if it was stored
        if (REQUEST) REQUEST.cancel();

        // Create new request token if exists
        REQUEST = axios.CancelToken.source();

        // Get releases from server
        // Transform releases
        const response = (await new ReleaseProxy().getReleases({cancelToken: REQUEST.token}));
        const releases = (await new ReleaseTransformer()
          .setStore(this)
          .setCancelToken(REQUEST.token)
          .fetchWithEpisodes(true)
          .fetchCollection(response))
          .sort((a, b) => new Date(b.datetime.system) - new Date(a.datetime.system))
          .filter(release => release && release.episodes && release.episodes.length > 0);

        // Try to emit release notifications
        await dispatch('_emitReleasesNotifications', {releases, previous_releases: state.data});

        // Set updated datetime
        // Commit releases
        commit(SET_RELEASES_DATA, releases);
        commit(SET_RELEASES_DATETIME, new Date());

      } catch (error) {
        if (!axios.isCancel(error)) {

          // Set release has error
          commit(SET_RELEASES_HAS_ERROR, true);

          // Show error
          // Throw error
          ErrorResolver.emitError('Произошла ошибка при загрузке релизов');
          throw error;

        }
      } finally {
        commit(SET_RELEASES_LOADING, false);
      }
    },


    /**
     * Emit releases notifications
     *
     * @param state
     * @param dispatch
     * @param releases
     * @param previousReleases
     * @return {Promise<void>}
     * @private
     */
    async _emitReleasesNotifications({dispatch}, {releases, previous_releases}) {

      // Try to find new releases and show notifications
      // If previous releases exists (ignore initial request)
      if (previous_releases && previous_releases.length > 0) {
        releases.forEach(release => {

          // Get release id and episodes number
          const release_id = release.id;
          const release_episodes = release.episodes.length;

          // Get previous release
          // Check by id and same episodes number
          const previous_release = previous_releases.find(item => item.id === release_id && item.episodes.length === release_episodes) || null;

          // If no release found
          // Send to notifications store
          if (previous_release === null) {

            // Get first (latest) episode
            const episode = release.episodes[0];

            // Send release to notifications store
            dispatch('notifications/addNotification', {release, episode}, {root: true});

            // Emit app notification
            NotificationsResolver.emitNotification({release, episode})

          }
        });
      }
    }
  }
}
