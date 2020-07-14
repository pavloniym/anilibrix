import axios from "axios";
import {Main} from "@main/utils/windows";
import AnilibriaProxy from "@proxies/anilibria";
import AnilibriaReleaseTransformer from "@transformers/anilibria/release";

const SET_ITEMS = 'SET_ITEMS';
const SET_LOADING = 'SET_LOADING';
const SET_ITEM_EPISODES = 'SET_ITEM_EPISODES';
const SET_SETTINGS_SORT = 'SET_SETTINGS_SORT';
const SET_SETTINGS_GROUP = 'SET_SETTINGS_GROUP';
const SET_LOADING_EPISODES = 'SET_LOADING_EPISODES';
const SET_SETTINGS_SHOW_SEEN = 'SET_SETTINGS_SHOW_SEEN';
const SET_SETTINGS_YEARS_COLLAPSED = 'SET_SETTINGS_YEARS_COLLAPSED';

const REQUESTS = {releases: null};

export default {
  namespaced: true,
  state: {
    items: [],
    loading: false,
    loading_episodes: false,
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
     * Set item episodes
     *
     * @param s
     * @param release
     * @param episodes
     */
    [SET_ITEM_EPISODES](s, {release, episodes}) {
      const item_index = s.items.findIndex(item => item.id === release.id);
      if (item_index > -1) s.items.splice(item_index, 1, {...s.items[item_index], episodes});
    },


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
     * Set loading episodes state
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_LOADING_EPISODES]: (s, state) => s.loading_episodes = state,


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
     * @param dispatch
     * @return {Promise<void>}
     */
    getFavorites: async ({commit, getters, dispatch}) => {
      if (getters.isAuthorized) {
        try {

          // Set loading
          commit(SET_LOADING, true);
          commit(SET_LOADING_EPISODES, true);

          // Cancel previous request if it was stored
          // Create new request token
          if (REQUESTS.releases) REQUESTS.releases.cancel();
          REQUESTS.releases = axios.CancelToken.source();


          // Get releases from server
          // Transform releases
          const {items} = await new AnilibriaProxy().getFavorites({page: 1}, {cancelToken: REQUESTS.releases.token});
          const releases = await new AnilibriaReleaseTransformer({skip_episodes: true}).fetchCollection(items);

          // Get posters
          await Promise.allSettled(
            releases.map(async release =>
              release.poster.image = await new AnilibriaProxy().getImage({src: release.poster.path})
            )
          );

          // Set releases
          commit(SET_ITEMS, releases);
          commit(SET_LOADING, false);

          // Get favorites episodes
          await Promise.allSettled(
            items.map(async item =>
              commit(SET_ITEM_EPISODES, {release: item, episodes: await dispatch('_getFavoriteEpisodes', item)}))
          );

          // Reset loading episodes
          commit(SET_LOADING_EPISODES, false);

        } catch (error) {
          if (!axios.isCancel(error)) {

            // Show error
            Main.sendToWindow('app:error', 'Произошла ошибка при загрузке избранных релизов');
            Main.sendToWindow('app:error', error);

            // Reset loading
            commit(SET_LOADING, false);
            commit(SET_LOADING_EPISODES, false);
          }
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
    addToFavorites: async ({dispatch, getters, commit}, release) => {
      if (release && getters.isAuthorized) {
        try {

          commit(SET_LOADING, true);

          // Add release to favorites
          // Refresh favorites
          await new AnilibriaProxy().addToFavorites(release.id);
          await dispatch('getFavorites');

        } catch (error) {

          Main.sendToWindow('app:error', 'Произошла ошибка при добавлении релиза в избранное');

        } finally {
          commit(SET_LOADING, false);
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
    removeFromFavorites: async ({dispatch, getters, commit}, release) => {
      if (release && getters.isAuthorized) {
        try {

          commit(SET_LOADING, true);

          // Remove release from favorites
          // Refresh favorites
          await new AnilibriaProxy().removeFromFavorites(release.id);
          await dispatch('getFavorites');

        } catch (error) {

          Main.sendToWindow('app:error', 'Произошла ошибка при удалении релиза из избранного');

        } finally {
          commit(SET_LOADING, false);
        }
      }
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
    setSettingsShowSeen: ({commit}, state) => commit(SET_SETTINGS_SHOW_SEEN, state),


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
     * Get favorite episodes
     *
     * @param commit
     * @param release
     * @return {Promise<*>}
     * @private
     */
    _getFavoriteEpisodes: async ({commit}, release) => {
      const {episodes} = await new AnilibriaReleaseTransformer().fetchItem(release);
      return episodes;
    }

  }
}
