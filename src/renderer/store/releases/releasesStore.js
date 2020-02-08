import ReleasesProxy from '@proxies/releases'
import ReleasesTransformer from '@transformers/releases'

import { mutationsHelper } from '@utils/store'

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
     * @return {Promise<any>}
     */
    getLatestReleases({ commit }) {
      commit('set', { k: 'loading', v: true });
      return new ReleasesProxy()
        .all()
        .then(releases => ReleasesTransformer.fetchCollection(releases.items))
        .then(releases => commit('set', { k: 'items', v: releases }))
        .finally(() => commit('set', { k: 'loading', v: false }))
    }

  }
}
