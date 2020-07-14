import AnilibriaProxy from '@proxies/anilibria'
import AnilibriaReleaseTransformer from '@transformers/anilibria/release'

import axios from 'axios'
import __get from 'lodash/get'
import {Main} from '@main/utils/windows'

const SET_INDEX = 'SET_INDEX';
const SET_RELEASES_DATA = 'SET_RELEASES_DATA';
const SET_RELEASES_LOADING = 'SET_RELEASES_LOADING';
const SET_RELEASES_DATETIME = 'SET_RELEASES_DATETIME';
const SET_RELEASES_HAS_ERROR = 'SET_RELEASES_HAS_ERROR';

const REQUESTS = {search: null, releases: null};

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
        if (REQUESTS.releases) REQUESTS.releases.cancel();

        // Create new request token if exists
        REQUESTS.releases = axios.CancelToken.source();

        // Get releases from server
        // Transform releases
        const {items} = await new AnilibriaProxy().getReleases({cancelToken: REQUESTS.releases.token});
        const releases = await AnilibriaReleaseTransformer.fetchCollection(items);

        // Filters releases without episodes
        const filteredReleases = releases.filter(release => release.episodes.length > 0);

        // Get posters
        await Promise.allSettled(
          filteredReleases.map(async release =>
            release.poster.image = await new AnilibriaProxy().getImage({src: release.poster.path})
          )
        );

        // Sort releases from newest to oldest
        const sortedReleases = filteredReleases.sort((a, b) => new Date(b.datetime.system) - new Date(a.datetime.system));

        // Try to find new releases and show notifications
        // If previous releases exists (ignore initial request)
        if (state.data && state.data.length > 0) {
          sortedReleases.forEach(release => {

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
              Main.sendToWindow('app:notification', release);

              // Send release to notifications store
              dispatch('notifications/setRelease', release, {root: true})
            }
          });
        }

        // Set updated datetime
        // Commit releases
        commit(SET_RELEASES_DATA, sortedReleases);
        commit(SET_RELEASES_DATETIME, new Date());

      } catch (error) {
        if (!axios.isCancel(error)) {

          // Show error
          Main.sendToWindow('app:error', 'Произошла ошибка при загрузке релизов');
          Main.sendToWindow('app:error', error);

          // Set release has error
          commit(SET_RELEASES_HAS_ERROR, true);

        }
      } finally {

        commit(SET_RELEASES_LOADING, false);

      }
    },


    /**
     * Search releases
     *
     * @param dispatch
     * @param state
     * @param commit
     * @param searchQuery
     * @param parameters
     * @return {Promise<{names: {ru: string, original: *}, id: *}[]>}
     */
    searchReleases: async ({dispatch, state, commit}, searchQuery) => {
      try {

        // Cancel previous request if it was stored
        if (REQUESTS.search) REQUESTS.search.cancel();

        // Create new request token if exists
        REQUESTS.search = axios.CancelToken.source();

        // Get releases
        const releases = await new AnilibriaProxy()
          .searchReleases(searchQuery, {cancelToken: REQUESTS.search.token});

        // Transform releases
        return (releases || [])
          .map(release => {
            return {
              id: __get(release, 'id'),
              names: {
                ru: __get(release, ['names', 0]),
                original: __get(release, ['names', 1])
              }
            }
          })
          .filter(release => release.id);


      } catch (error) {
        if (!axios.isCancel(error)) {

          Main.sendToWindow('app:error', 'Произошла ошибка при поиске релизов');
          Main.sendToWindow('app:error', error);

          return [];
        }
      }
    }
  }
}
