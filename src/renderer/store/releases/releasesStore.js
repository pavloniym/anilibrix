import AnilibriaProxy from '@proxies/anilibria'
import AnilibriaReleaseTransformer from '@transformers/anilibria/release'

import axios from 'axios'
import __get from 'lodash/get'

const SET_INDEX = 'SET_INDEX';
const SET_RELEASES_DATA = 'SET_RELEASES_DATA';
const SET_RELEASES_LOADING = 'SET_RELEASES_LOADING';
const SET_RELEASES_DATETIME = 'SET_RELEASES_DATETIME';

const REQUESTS = {search: null, releases: null};

export default {
  namespaced: true,
  state: {
    data: [],
    index: null,
    loading: false,
    datetime: null
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

        // Cancel previous request if it was stored
        if (REQUESTS.releases) REQUESTS.releases.cancel();

        // Create new request token if exists
        REQUESTS.releases = axios.CancelToken.source();

        // Get releases from server
        // Transform releases
        const {items} = await new AnilibriaProxy().getReleases({cancelToken: REQUESTS.releases.token});
        const releases = await AnilibriaReleaseTransformer.fetchCollection(items);

        // Get posters
        await Promise.allSettled(
          releases.map(async release =>
            release.poster.image = await new AnilibriaProxy().getPoster({src: release.poster.path})
          )
        );

        // Sort releases from newest to oldest
        const sortedReleases = releases.sort((a, b) => new Date(b.datetime.system) - new Date(a.datetime.system));

        // Commit releases
        commit(SET_RELEASES_DATA, sortedReleases);


        // If datetime is set -> it not initial request
        // Try to find new releases and show notifications
        if (state.datetime) {
          sortedReleases
            .filter(release => release.datetime.system > state.datetime)
            .forEach(release => dispatch('notifications/setRelease', release, {root: true}))
        }

        // Set updated datetime
        commit(SET_RELEASES_DATETIME, new Date());

      } catch (error) {
        if (!axios.isCancel(error)) {

          // Show errors
          dispatch('app/setError', 'Произошла ошибка при загрузке релизов', {root: true});
          dispatch('app/setError', error, {root: true});

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

          dispatch('app/setError', 'Произошла ошибка при поиске релизов', {root: true});
          dispatch('app/setError', error, {root: true});

          return [];
        }
      }
    }
  }
}
