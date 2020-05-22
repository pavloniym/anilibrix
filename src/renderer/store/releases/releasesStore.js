import AnilibriaProxy from '@proxies/anilibria'
import AnilibriaReleaseTransformer from '@transformers/anilibria/release'

import axios from 'axios'
import __get from 'lodash/get'
import {generalMutations} from '@utils/store/mutations'

export default {
  namespaced: true,
  state: {
    data: [],
    index: null,
    loading: false,
    datetime: null,
    requests: {
      getReleases: null,
      searchReleases: null,
    }
  },

  mutations: {
    ...generalMutations
  },

  actions: {

    /**
     * Set slider index
     *
     * @param commit
     * @param index
     * @return {*}
     */
    setIndex: ({commit}, index) => commit('set', {k: 'index', v: index}),


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
        commit('set', {k: 'loading', v: true});

        // Cancel previous request if it was stored
        if (state.requests.getReleases !== null) state.requests.getReleases.cancel();

        // Create new request token if exists
        commit('set', {k: 'requests.getReleases', v: axios.CancelToken.source()});

        // Get releases from server
        const data = await new AnilibriaProxy().getReleases({cancelToken: state.requests.getReleases.token});

        // Transform releases
        const items = await AnilibriaReleaseTransformer.fetchCollection(data.items);

        // Get posters
        await dispatch('_getPosters', items);

        // Sort releases from newest to oldest
        const releases = items.sort((a, b) => new Date(b.datetime.system) - new Date(a.datetime.system));

        // Commit releases
        // Set update datetime
        commit('set', {k: 'data', v: releases});
        commit('set', {k: 'datetime', v: new Date()});

        // Reset loading state
        commit('set', {k: 'loading', v: false});

      } catch (error) {

        // Reset loading state
        commit('set', {k: 'loading', v: false});

        // Show errors
        dispatch('app/setError', 'Произошла ошибка при загрузке релизов', {root: true});
        dispatch('app/setError', error, {root: true});
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
        if (state.requests.searchReleases !== null) state.requests.searchReleases.cancel();

        // Create new request token if exists
        commit('set', {k: 'requests.searchReleases', v: axios.CancelToken.source()});

        // Get releases
        const releases = await new AnilibriaProxy()
          .searchReleases(searchQuery, {cancelToken: state.requests.getReleases.token});

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

        dispatch('app/setError', 'Произошла ошибка при поиске релизов', {root: true});
        dispatch('app/setError', error, {root: true});

        return [];
      }
    },


    /**
     * Update releases posters
     *
     * @param commit
     * @param state
     * @param dispatch
     * @param releases
     * @return Promise
     */
    _getPosters: async ({commit, state, dispatch}, releases) => {
      return await Promise.allSettled(
        releases
          .filter(release => release.poster.path)
          .map(async release => {

              try {

                return await new AnilibriaProxy()
                  .getPoster({src: release.poster.path})
                  .then(image => release.poster.image = `data:image/jpeg;base64,${image}`);

              } catch (error) {

                // Show error
                dispatch('app/setError', `Произошла ошибка при загрузке постера к релизу ${release.id}`, {root: true});
              }

            }
          )
      );
    }

  }
}
