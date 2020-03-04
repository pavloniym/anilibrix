import ReleasesProxy from '@proxies/releases'
import ReleasesTransformer from '@transformers/releases'

import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {

    items: {
      loading: false,
      data: [],
      posters: {},
      index: null,
    },

    item: {
      loading: false,
      data: null
    },

    search: {
      loading: false,
      data: [],
    }
  },

  mutations: {
    ...mutationsHelper
  },

  actions: {

    /**
     * Set slider index
     *
     * @param commit
     * @param index
     * @return {*}
     */
    setIndex: ({commit}, index) =>
      commit('set', {k: 'items.index', v: index}),


    /**
     * Get latest releases
     *
     * @param commit
     * @param state
     * @param dispatch
     * @return {Promise<any>}
     */
    getLatestReleases: ({state, commit, dispatch}) => {
      return new Promise((resolve, reject) => {
        commit('set', {k: 'items.loading', v: true});
        return new ReleasesProxy()
          .getReleases()
          .then(releases => ReleasesTransformer.fetchCollection(releases.items))
          .then(releases => commit('set', {k: 'items.data', v: releases}))
          .then(() => dispatch('getReleasesPosters'))
          .then(() => resolve())
          .catch(error => {
            dispatch('app/pushError', error, {root: true});
            reject();
          })
          .finally(() => commit('set', {k: 'items.loading', v: false}))
      });
    },


    /**
     * Get releases by name
     * Send search query
     *
     * @param commit
     * @param dispatch
     * @param searchQuery
     * @return {Promise<unknown>}
     */
    getReleasesByName: ({commit, dispatch}, searchQuery) => {
      return new Promise((resolve, reject) => {
        commit('set', {k: 'search.loading', v: true});
        new ReleasesProxy()
          .searchReleasesByName(searchQuery)
          .then(releases => ReleasesTransformer.fetchCollection(releases))
          .then(releases => commit('set', {k: 'search.data', v: releases}))
          .catch(error => {
            dispatch('app/pushError', error, {root: true});
            reject();
          })
          .finally(() => commit('set', {k: 'search.loading', v: false}))

      })
    },


    /**
     * Update releases posters
     * Update only empty posters
     * Remove old releases' posters
     *
     * @param commit
     * @param state
     */
    getReleasesPosters({commit, state}) {

      const posters = state.items.posters;
      const items = state.items.data || [];

      // Remove old poster for old releases
      Object.keys(posters)
        .filter(releaseId => !!items.find(release => release.id === releaseId))
        .forEach(releaseId => delete posters[releaseId]);

      // Set posters only with existing releases
      commit('set', {k: 'items.posters', v: posters});

      // Update posters for new releases
      items
        .filter(release => release.poster && !state.items.posters[release.id])
        .forEach(release => {
          new ReleasesProxy()
            .getPosterImage(release.poster)
            .then(imageInBase64 =>
              commit('set', {
                k: 'items.posters',
                v: {...state.items.posters, [release.id]: 'data:image/jpeg;base64,' + imageInBase64}
              })
            )
            .catch(error => dispatch('app/pushError', error, {root: true}))
        });
    }

  }
}
