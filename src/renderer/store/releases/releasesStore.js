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
      commit('set', {k: 'loading', v: true});

      try {

        // Cancel previous request if it was stored
        if (state.requests.getReleases !== null) state.requests.getReleases.cancel();

        // Create new request token if exists
        commit('set', {k: 'requests.getReleases', v: axios.CancelToken.source()});

        // Get releases from server
        const data = await new AnilibriaProxy().getReleases({cancelToken: state.requests.getReleases.token});

        // Transform releases
        let releases = await AnilibriaReleaseTransformer.fetchCollection(data.items);

        // Get posters
        const posters = await dispatch('_getPosters', {releases});

        // Sort releases from newest to oldest
        releases = releases.sort((a, b) => new Date(b.datetime.system) - new Date(a.datetime.system));

        // Set release posters
        posters
          .map(poster => poster.value || null)
          .filter(poster => poster)
          .forEach(poster => {
            const release = releases.find(release => release.id === poster.releaseId);
            if (release) {
              release.poster.image = poster.image;
            }
          });

        // Commit releases
        // Set update datetime
        commit('set', {k: 'data', v: releases});
        commit('set', {k: 'datetime', v: new Date()});

        // Get updates
        // Send them to notification store
        /*.then(() =>
          state.data
            .filter(release =>
              state.datetime
                ? new Date(release.datetime.system) > state.datetime
                : false
            )
            .forEach(release => dispatch('notifications/addRelease', release, {root: true}))
        )*/

      } catch (error) {
        dispatch('app/setError', 'Произошла ошибка при загрузке релизов', {root: true});
        dispatch('app/setError', error, {root: true});
      }

      commit('set', {k: 'loading', v: false});
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
      }

      // Return empty
      return [];
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
    _getPosters: async ({commit, state, dispatch}, {releases = []} = {}) => {
      return await Promise.allSettled(
        releases
          .filter(release => release.poster.path)
          .map(async release => {
              try {

                return await new AnilibriaProxy()
                  .getPoster({src: release.poster.path})
                  .then(image => ({image: `data:image/jpeg;base64,${image}`, releaseId: release.id}));

              } catch (error) {
                dispatch('app/setError', `Произошла ошибка при загрузке постера к релизу ${release.id}`, {root: true});
              }
            }
          )
      );
    }

  }
}
