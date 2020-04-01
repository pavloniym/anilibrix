import AnilibriaProxy from "@proxies/anilibria";
import AnilibriaReleaseTransformer from "@transformers/anilibria/release";

import {mutationsHelper} from "@utils/store";
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    request: null,
    data: [],
  },

  mutations: {
    ...mutationsHelper
  },

  actions: {


    /**
     * Get releases by name
     * Send search query
     *
     * @param commit
     * @param dispatch
     * @param state
     * @param searchQuery
     * @return {Promise<unknown>}
     */
    getReleasesByName: ({commit, dispatch, state}, searchQuery) => {
      return new Promise((resolve, reject) => {

        // Cancel previous request if it was stored
        if (state.request !== null) {
          state.request.cancel();
        }

        commit('set', {k: 'loading', v: true});
        commit('set', {k: 'data', v: []});
        commit('set', {k: 'request', v: axios.CancelToken.source()});

        new AnilibriaProxy()
          .searchReleasesByName(searchQuery, {cancelToken: state.request.token})
          .then(releases => AnilibriaReleaseTransformer.fetchCollection(releases))
          .then(releases => commit('set', {k: 'data', v: releases}))
          .then(() => commit('set', {k: 'loading', v: false}))
          .catch(() => null)
      })
    },

  }
}
