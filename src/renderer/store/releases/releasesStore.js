import AnilibriaProxy from '@proxies/anilibria'
import JikanProxy from '@proxies/jikan'

import AnilibriaReleasesTransformer from '@transformers/anilibria/releases'
import JikanAnimeTransformer from '@transformers/jikan/anime'

import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {

    items: {
      loading: false,
      data: [],
      posters: {},
      index: null,
      datetime: null,
    },

    item: {
      loading: false,
      data: null,
      jikan: {
        anime: null,
        episodes: [],
      },
      poster: null,
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
        commit('set', {k: 'items.datetime', v: new Date()});
        return new AnilibriaProxy()
          .getReleases()
          .then(releases => AnilibriaReleasesTransformer.fetchCollection(releases.items))
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
        commit('set', {k: 'item.loading', v: true});
        new AnilibriaProxy()

          // Get release data from anilibria
          .getRelease(releaseId)
          .then(release => AnilibriaReleasesTransformer.fetchItem(release))
          .then(release => commit('set', {k: 'item.data', v: release}))

          // Try to get poster from anilibria server
          .then(() => dispatch('getReleasePoster', state.item.data.poster))
          .then(posterImage => commit('set', {k: 'item.poster', v: posterImage}))

          // Resolve release request
          .then(() => resolve(state.item.data))

          // Make jikan api request for more anime data
          //.then(() => dispatch('getJikanAnimeData'))

          // Catch errors
          .catch(error => {
            dispatch('app/pushError', error, {root: true});
            reject();
          })

          // Remove loading
          .finally(() => commit('set', {k: 'item.loading', v: false}))
      })
    },


    /**
     * Get jikan anime data
     *
     * @param commit
     * @param state
     * @return {Promise<unknown>}
     */
    getJikanAnimeData: ({commit, state}) => {
      return new Promise((resolve, reject) => {
        commit('set', {k: 'item.jikan.anime', v: null});
        commit('set', {k: 'item.jikan.episodes', v: []});
        new JikanProxy()
          .getAnimeByName(state.item.data.names.original)
          .then(jikanAnime => JikanAnimeTransformer.anime(jikanAnime))
          .then(jikanAnime => commit('set', {k: 'item.jikan.anime', v: jikanAnime}))
          .then(() => new JikanProxy().getAnimeEpisodes(state.item.jikan.anime.id))
          .then(jikanEpisodes => JikanAnimeTransformer.episodes(jikanEpisodes))
          .then(jikanEpisodes => commit('set', {k: 'item.jikan.episodes', v: jikanEpisodes}))
          .then(() => resolve())
          .catch(error => reject(error))
      })
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
        new AnilibriaProxy()
          .searchReleasesByName(searchQuery)
          .then(releases => AnilibriaReleasesTransformer.fetchCollection(releases))
          .then(releases => commit('set', {k: 'search.data', v: releases}))
          .catch(error => {
            dispatch('app/pushError', error, {root: true});
            reject();
          })
          .finally(() => commit('set', {k: 'search.loading', v: false}))

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
          .then(imageInBase64 => resolve(`data:image/jpeg;base64,${imageInBase64}`))
          .catch(error => reject(error))
      })
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
          dispatch('getReleasePoster', release.poster)
            .then(posterImage =>
              commit('set', {k: 'items.posters', v: {...state.items.posters, [release.id]: posterImage}})
            )
            .catch(error => dispatch('app/pushError', error, {root: true}))
        });
    }

  }
}
