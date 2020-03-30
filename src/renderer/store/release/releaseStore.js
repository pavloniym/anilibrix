import AnilibriaProxy from '@proxies/anilibria'
import MyAnimeListProxy from '@proxies/my-anime-list'

import AnilibriaReleaseTransformer from '@transformers/anilibria/release'
import {MyAnimeListAnimeTransformer, MyAnimeListEpisodeTransformer} from '@transformers/my-anime-list'

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
          .then(release => AnilibriaReleaseTransformer.fetchItem(release))
          .then(release => commit('set', {k: 'data', v: release}))

          // Try to get poster from anilibria server
          .then(() => dispatch('getReleasePoster', state.data.poster))
          .then(poster => commit('set', {k: 'poster', v: poster}))
          .then(() => {

            // Resolve release request
            // Disable loading state
            commit('set', {k: 'loading', v: false});
            resolve(state.data);

            try {
              // Get my anime list release data
              // Make it in background
              dispatch('getMALData')

            } catch (e) {
              console.log('my anime list api error', e);
            }
          })

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
        new MyAnimeListProxy()
          .getAnimeByName(state.data.names.original)
          .then(anime => MyAnimeListAnimeTransformer.fetchItem(anime))
          .then(anime => commit('set', {k: 'mal.anime', v: anime}))
          .then(() => new MyAnimeListProxy().getAnimeEpisodes(state.mal.anime.id))
          .then(episodes => MyAnimeListEpisodeTransformer.fetchCollection(episodes))
          .then(episodes => commit('set', {k: 'mal.episodes', v: episodes}))
          .then(() => resolve())
          .catch(error => reject(error))
      })
    },


    /**
     * Clear release data
     *
     * @param commit
     */
    clearRelease: ({commit}) => {
      commit('set', {k: 'data', v: null});
      commit('set', {k: 'mal.anime', v: null});
      commit('set', {k: 'mal.episodes', v: []});
      commit('set', {k: 'poster', v: null});
    }

  }
}