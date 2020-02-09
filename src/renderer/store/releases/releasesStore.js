import ReleasesProxy from '@proxies/releases'
import ReleasesTransformer from '@transformers/releases'

import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    loading: false,
    items: []
  },

  mutations: {
    ...mutationsHelper
  },

  actions: {

    /**
     * Get latest releases
     *
     * @param commit
     * @param state
     * @return {Promise<any>}
     */
    getLatestReleases: ({commit, dispatch}) => {
      commit('set', {k: 'loading', v: true});
      return new ReleasesProxy()
        .getReleases()
        .then(releases => ReleasesTransformer.fetchCollection(releases.items))
        .then(releases => commit('set', {k: 'items', v: releases}))
        .then(() => dispatch('getReleasesPosters'))
        .finally(() => commit('set', {k: 'loading', v: false}))
    },


    /**
     * Update releases posters
     * Update only empty posters
     *
     * @param commit
     * @param state
     */
    getReleasesPosters: ({commit, state}) => {
      (state.items || [])
        .filter(release => release.poster.image === null)
        .forEach((release, k) => {
          new ReleasesProxy()
            .getPosterImage(release.poster.url)
            .then(imageInBase64 =>
              commit('set', {k: ['items', k, 'poster', 'image'], v: 'data:image/jpeg;base64,' + imageInBase64})
            )
            .catch(error => console.log(error))
        })
    }

  }
}
