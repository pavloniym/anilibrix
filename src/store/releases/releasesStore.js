// Proxy
import ReleaseProxy from "@proxies/release";

// Transformers
import ReleaseTransformer from '@transformers/release'
import EpisodesTransformer from "@transformers/episode";

// Utils
import axios from 'axios'

// Events
import {sendError} from "@/events/errors/errorsEvents";


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
    getReleases: async ({commit, dispatch, state}) => {
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
        const data = await new ReleaseProxy().getReleases({cancelToken: REQUEST.token});
        const releases = new ReleaseTransformer().fetchCollection(data);

        // Filters releases without episodes
        // Sort releases from newest to oldest
        const filteredReleases = releases
          .map(release => ({...release, poster: new ReleaseProxy().getReleasePosterPath(release.poster)}))
          .sort((a, b) => new Date(b.datetime.system) - new Date(a.datetime.system));


        // Load episodes
        // Filter releases with episodes
        const processedReleases = (await Promise
          .allSettled(
            filteredReleases
              .map(async release => ({
                ...release,
                episodes: await new EpisodesTransformer({cancelToken: REQUEST.token})
                  .fetchItem(release.episodes)
              }))
          ))
          .filter(promise => promise.status === 'fulfilled')
          .map(promise => promise.value)
          .filter(release => release.episodes.length > 0);


        // Try to find new releases and show notifications
        // If previous releases exists (ignore initial request)
        if (state.data && state.data.length > 0) {
          processedReleases.forEach(release => {

            // Get release id and episodes number
            const releaseId = release.id;
            const releaseEpisodes = release.episodes.length;

            // Get previous release
            // Check by id and same episodes number
            const previousRelease = state.data.find(item => item.id === releaseId && item.episodes.length === releaseEpisodes) || null;

            // If no release found
            // Send to notifications store
            if (previousRelease === null) {

              // Send notification event to main window
              //   emitReleaseNotification(release);

              // Send release to notifications store
              dispatch('notifications/setRelease', release, {root: true})
            }
          });
        }

        // Set updated datetime
        // Commit releases
        commit(SET_RELEASES_DATA, processedReleases);
        commit(SET_RELEASES_DATETIME, new Date());

      } catch (error) {

        if (!axios.isCancel(error)) {

          // Set release has error
          commit(SET_RELEASES_HAS_ERROR, true);

          // Show error
          // Throw error
          sendError('Произошла ошибка при загрузке релизов');
          throw error;

        }

      } finally {
        commit(SET_RELEASES_LOADING, false);
      }
    }

  }
}
