import Vue from 'vue'
import AnilibriaProxy from '@proxies/anilibria'
import AnilibriaReleaseTransformer from '@transformers/anilibria/release'

import axios from "axios";
import {mutationsHelper} from "@utils/store";

export default {
  namespaced: true,
  state: {
    data: null,
    request: null,
    loading: false,
    episodes: {
      meta: {},
      watch: {},
    }
  },

  mutations: {
    ...mutationsHelper
  },

  actions: {


    /**
     * Get release data
     * Also get release poster
     *
     * @param commit
     * @param dispatch
     * @param state
     * @param releaseId
     * @return {Promise<unknown>}
     */
    getRelease({commit, dispatch, state}, releaseId) {
      return new Promise((resolve, reject) => {

        // Cancel previous request if it was stored
        if (state.request !== null) {
          state.request.cancel();
        }

        commit('set', {k: 'data', v: null});
        commit('set', {k: 'loading', v: true});
        commit('set', {k: 'request', v: axios.CancelToken.source()});

        new AnilibriaProxy()
          .getRelease(releaseId, {cancelToken: state.request.token})
          .then(release => AnilibriaReleaseTransformer.fetchItem(release))
          .then(release => commit('set', {k: 'data', v: release}))
          .then(() => dispatch('getReleasePoster'))

          // Catch errors
          .catch(error => {
            dispatch('app/settings/system/pushError', error, {root: true});
            reject();
          })

          // Remove loading
          .finally(() => commit('set', {k: 'loading', v: false}))
      })
    },


    /**
     * Get release poster
     *
     * @param commit
     * @param state
     * @return Promise
     */
    getReleasePoster: ({commit, state}) => {
      return new Promise((resolve, reject) => {
        new AnilibriaProxy()
          .getPosterImage(state.data.poster.path)
          .then(image => `data:image/jpeg;base64,${image}`)
          .then(image => commit('set', {k: 'data.poster.image', v: image}))
          .then(() => resolve())
          .catch(error => reject(error))
      })
    },


    /**
     * Set episode watch data
     *
     * @param commit
     * @param episodeId
     * @param quality
     * @param time
     * @param percentage
     */
    setEpisodeWatchData: ({commit}, {episodeId = -1, quality = null, time = 0, percentage = 0} = {}) => {
      if (episodeId > -1) {
        commit('set', {k: `episodes.watch.${episodeId}`, v: {time, quality, percentage}})
      }
    }


  }
}
