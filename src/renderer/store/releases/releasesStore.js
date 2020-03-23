import AnilibriaProxy from '@proxies/anilibria'
import AnilibriaReleasesTransformer from '@transformers/anilibria/releases'

import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    loading: false,
    data: [],
    posters: {},
    index: null,
    datetime: null,
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
        commit('set', {k: 'datetime', v: new Date()});
        return new AnilibriaProxy()
          .getReleases()
          .then(releases => AnilibriaReleasesTransformer.fetchCollection(releases.items))
          .then(releases => commit('set', {k: 'data', v: releases}))
          .then(() => dispatch('getReleasesPosters'))
          .then(() => resolve())
          .catch(error => {
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
     * @param dispatch
     */
    getReleasesPosters({commit, state, dispatch}) {

      const posters = state.posters;
      const items = state.data || [];

      // Remove old poster for old releases
      Object.keys(posters)
        .filter(releaseId => !!items.find(release => release.id === releaseId))
        .forEach(releaseId => delete posters[releaseId]);

      // Set posters only with existing releases
      commit('set', {k: 'posters', v: posters});

      // Update posters for new releases
      items
        .filter(release => release.poster && !state.posters[release.id])
        .forEach(release => {
          new AnilibriaProxy()
            .getPosterImage(release.poster)
            .then(image => `data:image/jpeg;base64,${image}`)
            .then(image =>
              commit('set', {k: 'posters', v: {...state.posters, [release.id]: image}})
            )
            .catch(error => dispatch('app/pushError', error, {root: true}))
        });
    }

  }
}
