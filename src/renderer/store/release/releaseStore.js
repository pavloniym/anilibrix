import AnilibriaProxy from '@proxies/anilibria'
import AnilibriaReleasesTransformer from '@transformers/anilibria/releases'

import MALProxy from '@proxies/mal'
import {MALAnimeTransformer, MALEpisodeTransformer} from '@transformers/mal'

import {mutationsHelper} from "@utils/store";


export default {
  namespaced: true,
  state: {
    loading: false,
    data: null,
    mal: {
      anime: null,
      episodes: [],
    },
    poster: null,
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
    getRelease: ({commit, dispatch, state}, releaseId) => {
      return new Promise((resolve, reject) => {
        commit('set', {k: 'loading', v: true});
        new AnilibriaProxy()

          // Get release data from anilibria
          .getRelease(releaseId)
          .then(release => AnilibriaReleasesTransformer.fetchItem(release))
          .then(release => commit('set', {k: 'data', v: release}))

          // Try to get poster from anilibria server
          .then(() => dispatch('getReleasePoster', state.data.poster))
          .then(poster => commit('set', {k: 'poster', v: poster}))

          // Resolve release request
          // Disable loading state
          .then(() => resolve(state.data))
          .then(() => () => commit('set', {k: 'loading', v: false}))

          // Make jikan api request for more anime data
          .then(() => dispatch('getMALData'))

          // Catch errors
          .catch(error => {
            dispatch('app/pushError', error, {root: true});
            reject();
          })

          // Remove loading
          .finally(() => commit('set', {k: 'loading', v: false}))
      })
    },


    /**
     * Get release poster
     *
     * @param context
     * @param posterPath
     * @return {Promise<unknown>}
     */
    getReleasePoster: (context, posterPath) => {
      return new Promise((resolve, reject) => {
        new AnilibriaProxy()
          .getPosterImage(posterPath)
          .then(image => resolve(`data:image/jpeg;base64,${image}`))
          .catch(error => reject(error))
      })
    },


    /**
     * Get jikan anime data
     *
     * @param commit
     * @param state
     * @return {Promise<unknown>}
     */
    getMALData: ({commit, state}) => {
      return new Promise((resolve, reject) => {
        commit('set', {k: 'mal.anime', v: null});
        commit('set', {k: 'mal.episodes', v: []});
        new MALProxy()
          .getAnimeByName(state.data.names.original)
          .then(anime => MALAnimeTransformer.fetchItem(anime))
          .then(anime => commit('set', {k: 'mal.anime', v: anime}))
          .then(() => new MALProxy().getAnimeEpisodes(state.mal.anime.id))
          .then(episodes => MALEpisodeTransformer.fetchCollection(episodes))
          .then(episodes => commit('set', {k: 'mal.episodes', v: episodes}))
          .then(() => resolve())
          .catch(error => reject(error))
      })
    },

  }
}
