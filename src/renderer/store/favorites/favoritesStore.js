import axios from "axios";
import {Main} from "@main/utils/windows";
import AnilibriaProxy from "@proxies/anilibria";
import AnilibriaReleaseTransformer from "@transformers/anilibria/release";

const SET_ITEMS = 'SET_ITEMS';
const SET_LOADING = 'SET_LOADING';
const SET_SETTINGS_SORT = 'SET_SETTINGS_SORT';
const SET_SETTINGS_GROUP = 'SET_SETTINGS_GROUP';
const SET_SETTINGS_SHOW_SEEN = 'SET_SETTINGS_SHOW_SEEN';

const REQUESTS = {releases: null};

export default {
  namespaced: true,
  state: {
    items: [],
    loading: false,
    settings: {
      sort: 'original',
      group: 'original',
      show_seen: true,
    },

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


  },

  actions: {


    /**
     * Get favorites
     *
     * @param commit
     * @return {Promise<void>}
     */
    getFavorites: async ({commit}) => {
      try {

        // Set loading
        commit(SET_LOADING, true);

        // Cancel previous request if it was stored
        // Create new request token
        if (REQUESTS.releases) REQUESTS.releases.cancel();
        REQUESTS.releases = axios.CancelToken.source();


        // Get releases from server
        // Transform releases
        const {items} = await new AnilibriaProxy().getFavorites({page: 1}, {cancelToken: REQUESTS.releases.token});
        const releases = await AnilibriaReleaseTransformer.fetchCollection(items);

        // Get posters
        await Promise.allSettled(
          releases.map(async release =>
            release.poster.image = await new AnilibriaProxy().getImage({src: release.poster.path})
          )
        );

        // Set releases
        commit(SET_ITEMS, releases);

      } catch (error) {
        if (!axios.isCancel(error)) {

          Main.sendToWindow('app:error', 'Произошла ошибка при загрузке релизов');
          Main.sendToWindow('app:error', error);

        }
      } finally {

        commit(SET_LOADING, false);

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

  }
}
