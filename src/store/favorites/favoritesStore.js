// Proxy
import ReleaseProxy from "@proxies/release";
import FavoritesProxy from "@proxies/favorites";

// Transformer
import ReleaseTransformer from "@transformers/release";

// Utils
import axios from "axios";

// Resolvers
import ErrorResolver from "@@/utils/resolvers/error";


// Mutations
const ADD_ITEM = 'ADD_ITEM';
const SET_ITEMS = 'SET_ITEMS';
const SET_LOADING = 'SET_LOADING';
const REMOVE_ITEM = 'REMOVE_ITEM';
const SET_SETTINGS_SORT = 'SET_SETTINGS_SORT';
const SET_SETTINGS_GROUP = 'SET_SETTINGS_GROUP';
const SET_SETTINGS_SHOW_SEEN = 'SET_SETTINGS_SHOW_SEEN';
const SET_SETTINGS_YEARS_COLLAPSED = 'SET_SETTINGS_YEARS_COLLAPSED';

// Requests
let REQUESTS_FOR_CHANGES = {};
let REQUEST_FOR_FAVORITES = null;

export const favoritesPersisted = ['favorites.settings'];

export default {
  namespaced: true,
  state: {
    items: [],
    loading: false,
    settings: {
      sort: 'original',
      group: 'years',
      show_seen: true,
      years_collapsed: [],
    },

  },

  getters: {

    /**
     * Check if user is authorized
     *
     * @param s
     * @param getters
     * @param rootState
     * @param rootGetters
     * @return {*}
     */
    isAuthorized: (s, getters, rootState, rootGetters) => rootGetters['app/account/isAuthorized'],


    /**
     * Check if provided release is in favorite
     *
     * @param s
     * @return {function(*): boolean}
     */
    isInFavorite: s => release => (s.items || []).findIndex(item => item.id === release.id) > -1,

  },

  mutations: {

    /**
     * Add item to array
     *
     * @param s
     * @param release
     * @return {*|void|number}
     */
    [ADD_ITEM]: (s, release) => s.items.unshift(release),


    /**
     * Set items
     *
     * @param s
     * @param items
     * @return {*}
     */
    [SET_ITEMS]: (s, items) => s.items = items,


    /**
     * Set loading
     *
     * @param s
     * @param loading
     * @return {*}
     */
    [SET_LOADING]: (s, loading) => s.loading = loading,


    /**
     * Remove release from items
     *
     * @param s
     * @param release
     * @return {*|any[]}
     */
    [REMOVE_ITEM]: (s, release) => s.items.splice(s.items.findIndex(item => item.id === release.id), 1),

    /**
     * Set settings sort type
     *
     * @param s
     * @param sort
     * @return {*}
     */
    [SET_SETTINGS_SORT]: (s, sort) => s.settings.sort = sort,


    /**
     * Set settings group type
     *
     * @param s
     * @param sort
     * @return {*}
     */
    [SET_SETTINGS_GROUP]: (s, group) => s.settings.group = group,


    /**
     * Set settings show seen
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_SETTINGS_SHOW_SEEN]: (s, state) => s.settings.show_seen = state,


    /**
     * Set years collapsed
     *
     * @param s
     * @param years
     * @return {*}
     */
    [SET_SETTINGS_YEARS_COLLAPSED]: (s, years) => s.settings.years_collapsed = years,

  },

  actions: {


    /**
     * Get favorites
     *
     * @param commit
     * @param getters
     * @return {Promise<void>}
     */
    getFavorites: async ({commit, getters}) => {
      if (getters.isAuthorized) {
        try {

          // Set loading
          commit(SET_LOADING, true);

          // Cancel previous request if it was stored
          if (REQUEST_FOR_FAVORITES) {
            REQUEST_FOR_FAVORITES.cancel();
          }

          // Create new request token
          REQUEST_FOR_FAVORITES = axios.CancelToken.source();

          // Get releases from server
          // Transform releases
          const {items} = await new FavoritesProxy().getFavorites({cancelToken: REQUEST_FOR_FAVORITES.token});
          const releases = new ReleaseTransformer().fetchCollection(items);

          // Load episodes
          // Filter releases with episodes
          /*const processedReleases = (await Promise
            .allSettled(
              releases
                .map(async release => ({
                  ...release,
                  episodes: await new EpisodesTransformer(
                    {
                      cancelToken: REQUEST_FOR_FAVORITES.token,
                      skipTorrents: true
                    }
                  )
                    .fetchItem(release.episodes)
                }))
            ))
            .filter(promise => promise.status === 'fulfilled')
            .map(promise => promise.value)
            .filter(release => release.episodes.length > 0)
            .map(release => ({...release, poster: new ReleaseProxy().getReleasePosterPath(release.poster)}));*/

          // Set releases
          //commit(SET_ITEMS, processedReleases);
          commit(SET_ITEMS, releases);

        } catch (error) {

          console.log(error);

          if (!axios.isCancel(error)) {

            // Show error
            // Throw error
            ErrorResolver.emitError('Произошла ошибка при загрузке избранных релизов');
            throw error;

          }
        } finally {

          commit(SET_LOADING, false);

        }
      }
    },


    /**
     * Add release to favorites
     * Refresh favorites
     *
     * @param dispatch
     * @param getters
     * @param commit
     * @param release
     * @return {Promise<void>}
     */
    addToFavorites: async ({getters, commit}, release) => {
      if (release && getters.isAuthorized) {
        try {

          // Cancel previous request if it was stored
          // Create new request token
          if (REQUESTS_FOR_CHANGES[release.id]) REQUESTS_FOR_CHANGES[release.id].cancel();
          REQUESTS_FOR_CHANGES[release.id] = axios.CancelToken.source();

          // Add release to favorites
          commit(ADD_ITEM, release);

          // Make request to server
          // On error -> rollback
          await new FavoritesProxy().addToFavorites(release.id, {cancelToken: REQUESTS_FOR_CHANGES[release.id].token});

        } catch (error) {
          if (!axios.isCancel(error)) {

            // Rollback added release
            commit(REMOVE_ITEM, release);

            // Show app error
            // Throw error
            ErrorResolver.emitError(error);
            throw error;

          }
        }
      }
    },

    /**
     * Remove release from favorites
     * Refresh favorites
     *
     * @param dispatch
     * @param getters
     * @param commit
     * @param release
     * @return {Promise<void>}
     */
    removeFromFavorites: async ({getters, commit}, release) => {
      if (release && getters.isAuthorized) {
        try {

          // Cancel previous request if it was stored
          // Create new request token
          if (REQUESTS_FOR_CHANGES[release.id]) REQUESTS_FOR_CHANGES[release.id].cancel();
          REQUESTS_FOR_CHANGES[release.id] = axios.CancelToken.source();

          // Remove release from favorites
          commit(REMOVE_ITEM, release);

          // Make request to server
          // On error -> rollback
          await new FavoritesProxy().removeFromFavorites(release.id, {cancelToken: REQUESTS_FOR_CHANGES[release.id].token});

        } catch (error) {
          if (!axios.isCancel(error)) {

            // Rollback removed release
            commit(ADD_ITEM, release);

            // Show app error
            // Throw error
            ErrorResolver.emitError(error);
            throw error;

          }
        }
      }
    },

    /**
     * Set settings year collapsed
     *
     * @param commit
     * @param state
     * @param year
     */
    setSettingsYearsCollapsed: ({commit, state}, year) => {

      const years = [...state.settings.years_collapsed];
      const year_index = years.findIndex(item => item === year);

      if (year_index > -1) years.splice(year_index, 1);
      if (year_index === -1) years.push(year);

      commit(SET_SETTINGS_YEARS_COLLAPSED, years);

    },


    /**
     * Set settings sort type
     *
     * @param commit
     * @param sort
     * @return {*}
     */
    setSettingsSort: ({commit}, sort) => commit(SET_SETTINGS_SORT, sort),


    /**
     * Set settings group type
     *
     * @param commit
     * @param group
     * @return {*}
     */
    setSettingsGroup: ({commit}, group) => commit(SET_SETTINGS_GROUP, group),


    /**
     * Set settings show seen
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setSettingsShowSeen: ({commit}, state) => commit(SET_SETTINGS_SHOW_SEEN, state)

  }
}
