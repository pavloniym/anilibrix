import ReleasesProxy from '@proxies/releases'
import ReleasesTransformer from '@transformers/releases'

import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    loading: false,
    items: [],
    posters: {},
    index: null,
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
      commit('set', {k: 'index', v: index}),


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
        commit('set', {k: 'loading', v: true});
        return new ReleasesProxy()
          .getReleases()
          .then(releases => ReleasesTransformer.fetchCollection(releases.items))
          .then(releases => commit('set', {k: 'items', v: releases}))
          .then(() => dispatch('updateReleasesPosters'))
          .then(() => resolve())
          .then(() => {

            // Check releases for notification subscriptions
            dispatch('notifications/checkReleasesForSubscription', state.items, {root: true});

          })
          .catch(error => {

            // On error -> push to error storage
            // Reject
            dispatch('app/pushError', error, {root: true});
            reject();

          })
          .finally(() => commit('set', {k: 'loading', v: false}))
      });
    },

    /**
     * Update releases posters
     * Update only empty posters
     * Remove old releases' posters
     *
     * @param commit
     * @param state
     */
    updateReleasesPosters({commit, state}) {

      // Remove old poster for old releases
      const posters = state.posters;
      Object.keys(posters)
        .filter(releaseId => !!state.items.find(release => release.id === releaseId))
        .forEach(releaseId => delete posters[releaseId]);

      // Set posters only with existing releases
      commit('set', {k: 'posters', v: posters});

      // Update posters for new releases
      (state.items || [])
        .filter(release => release.poster && !state.posters[release.id])
        .forEach(release => {
          new ReleasesProxy()
            .getPosterImage(release.poster)
            .then(imageInBase64 =>
              commit('set', {
                k: 'posters',
                v: {...state.posters, [release.id]: 'data:image/jpeg;base64,' + imageInBase64}
              })
            )
            .catch(error => dispatch('app/pushError', error, {root: true}))
        });
    }

  }
}
