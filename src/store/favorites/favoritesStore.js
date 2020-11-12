// Proxy + Transformer
import FavoritesProxy from "@proxies/favorites";
import ReleaseTransformer from "@transformers/release";

// Store
import {IS_AUTHORIZED_GETTER} from "@store/app/account/appAccountStore";

// Utils
import axios from "axios";

// Resolvers
import ErrorResolver from "@@/utils/resolvers/error";

// Getters
export const IS_IN_FAVORITE_GETTER = 'IS_IN_FAVORITE_GETTER';

// Mutations
const ADD_ITEM = 'ADD_ITEM';
const SET_ITEMS = 'SET_ITEMS';
const SET_LOADING = 'SET_LOADING';
const REMOVE_ITEM = 'REMOVE_ITEM';
const SET_SORT_SETTINGS = 'SET_SORT_SETTINGS';
const SET_GROUP_SETTINGS = 'SET_GROUP_SETTINGS';
const SET_SHOW_SEEN_SETTINGS = 'SET_SHOW_SEEN_SETTINGS';
const SET_YEARS_COLLAPSED_SETTINGS = 'SET_YEARS_COLLAPSED_SETTINGS';

// Actions
export const GET_FAVORITES_ACTION = 'GET_FAVORITES_ACTION';
export const ADD_TO_FAVORITES_ACTION = 'ADD_TO_FAVORITES_ACTION';
export const SET_SORT_SETTINGS_ACTION = 'SET_SORT_SETTINGS_ACTION';
export const SET_GROUP_SETTINGS_ACTION = 'SET_GROUP_SETTINGS_ACTION';
export const REMOVE_FROM_FAVORITES_ACTION = 'REMOVE_FROM_FAVORITES_ACTION';
export const SET_SEEN_RELEASES_SETTINGS_ACTION = 'SET_SEEN_RELEASES_SETTINGS_ACTION';

// Requests
let FAVORITES_CANCEL_TOKEN = null;
let FAVORITES_CHANGE_CANCEL_TOKENS = {};

// Persisted
export const favoritesPersisted = ['favorites.settings'];

export default {
  namespaced: true,
  state: {
    items: [],
    settings: {
      sort: 'original',
      group: 'years',
      show_seen: true,
      years_collapsed: [],
    },
    is_loading: false,
  },

  getters: {

    /**
     * Check if provided release is in favorite
     *
     * @param s
     * @return {function(*): boolean}
     */
    [IS_IN_FAVORITE_GETTER]: s => release => (s.items || []).findIndex(item => item.id === release.id) > -1,

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
    [SET_LOADING]: (s, is_loading) => s.is_loading = is_loading,


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
    [SET_SORT_SETTINGS]: (s, sort) => s.settings.sort = sort,


    /**
     * Set settings group type
     *
     * @param s
     * @param sort
     * @return {*}
     */
    [SET_GROUP_SETTINGS]: (s, group) => s.settings.group = group,


    /**
     * Set settings show seen
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_SHOW_SEEN_SETTINGS]: (s, state) => s.settings.show_seen = state,


    /**
     * Set years collapsed
     *
     * @param s
     * @param years
     * @return {*}
     */
    [SET_YEARS_COLLAPSED_SETTINGS]: (s, years) => s.settings.years_collapsed = years,

  },

  actions: {


    /**
     * Get favorites
     *
     * @param commit
     * @param getters
     * @return {Promise<void>}
     */
    [GET_FAVORITES_ACTION]: async ({commit, getters, rootGetters}) => {
      if (rootGetters[`app/account/${IS_AUTHORIZED_GETTER}`] === true) {
        try {

          // Set loading
          commit(SET_LOADING, true);

          // Cancel previous request if it was stored
          if (FAVORITES_CANCEL_TOKEN) FAVORITES_CANCEL_TOKEN.cancel();

          // Create new request token
          FAVORITES_CANCEL_TOKEN = axios.CancelToken.source();

          // Get releases from server
          // Transform releases
          const {items} = (await new FavoritesProxy().getFavorites({cancelToken: FAVORITES_CANCEL_TOKEN.token}));

          // Transform releases
          const releases = await new ReleaseTransformer()
            .setStore(this)
            .setCancelToken(FAVORITES_CANCEL_TOKEN.token)
            .setSkipTorrents(true)
            .fetchWithEpisodes(true)
            .fetchCollection(items);

          // Filter releases
          const filtered_release = releases.filter(release => release.episodes.length > 0);

          // Set releases
          commit(SET_ITEMS, filtered_release);

        } catch (error) {
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
    [ADD_TO_FAVORITES_ACTION]: async ({commit, rootGetters}, release) => {
      if (release && rootGetters[`app/account/${IS_AUTHORIZED_GETTER}`] === true) {
        try {

          // Cancel previous request if it was stored
          // Create new request token
          if (FAVORITES_CHANGE_CANCEL_TOKENS[release.id]) FAVORITES_CHANGE_CANCEL_TOKENS[release.id].cancel();
          FAVORITES_CHANGE_CANCEL_TOKENS[release.id] = axios.CancelToken.source();

          // Add release to favorites
          commit(ADD_ITEM, release);

          // Make request to server
          // On error -> rollback
          await new FavoritesProxy().addToFavorites(release.id, {cancelToken: FAVORITES_CHANGE_CANCEL_TOKENS[release.id].token});

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
    [REMOVE_FROM_FAVORITES_ACTION]: async ({commit, rootGetters}, release) => {
      if (release && rootGetters[`app/account/${IS_AUTHORIZED_GETTER}`] === true) {
        try {

          // Cancel previous request if it was stored
          // Create new request token
          if (FAVORITES_CHANGE_CANCEL_TOKENS[release.id]) FAVORITES_CHANGE_CANCEL_TOKENS[release.id].cancel();
          FAVORITES_CHANGE_CANCEL_TOKENS[release.id] = axios.CancelToken.source();

          // Remove release from favorites
          commit(REMOVE_ITEM, release);

          // Make request to server
          // On error -> rollback
          await new FavoritesProxy().removeFromFavorites(release.id, {cancelToken: FAVORITES_CHANGE_CANCEL_TOKENS[release.id].token});

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

      commit(SET_YEARS_COLLAPSED_SETTINGS, years);

    },


    /**
     * Set settings sort type
     *
     * @param commit
     * @param sort
     * @return {*}
     */
    [SET_SORT_SETTINGS_ACTION]: ({commit}, sort) => commit(SET_SORT_SETTINGS, sort),


    /**
     * Set settings group type
     *
     * @param commit
     * @param group
     * @return {*}
     */
    [SET_GROUP_SETTINGS_ACTION]: ({commit}, group) => commit(SET_GROUP_SETTINGS, group),


    /**
     * Set settings show seen
     *
     * @param commit
     * @param state
     * @return {*}
     */
    [SET_SEEN_RELEASES_SETTINGS_ACTION]: ({commit}, state) => commit(SET_SHOW_SEEN_SETTINGS, state)

  }
}
