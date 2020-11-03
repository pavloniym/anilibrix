// Utils
import axios from "axios";

// Proxy + Transformer
import SearchProxy from "@proxies/search";
import SearchTransformer from "@transformers/search";

// Resolvers
import ErrorResolver from "@@/utils/resolvers/error";

// Mutations
const SET_SEARCH = 'SET_SEARCH';
const SET_RELEASES = 'SET_RELEASES';
const SET_IS_LOADING = 'SET_IS_LOADING';

// Token
let CANCEL_TOKEN = null;

// Persisted
export const searchPersisted = ['search'];

export default {
  namespaced: true,
  state: {
    search: null,
    releases: [],
    is_loading: false,
  },

  mutations: {

    /**
     * Set search
     *
     * @param s
     * @param search
     * @return {*}
     */
    [SET_SEARCH]: (s, search = null) => s.search = search,


    /**
     * Set items
     *
     * @param s
     * @param items
     * @return {*[]}
     */
    [SET_RELEASES]: (s, releases = []) => s.releases = releases,


    /**
     * Set loading
     *
     * @param s
     * @param is_loading
     * @return {boolean}
     */
    [SET_IS_LOADING]: (s, is_loading = false) => s.is_loading = is_loading,


  },

  actions: {


    /**
     * Set search value
     *
     * @param commit
     * @param search
     * @return {*}
     */
    setSearch: async ({commit}, search) => commit(SET_SEARCH, search),


    /**
     * Search releases
     *
     * @param commit
     * @param search
     * @return {Promise<void>}
     */
    searchReleases: async ({commit}, search) => {
      try {

        // Set loading state
        commit(SET_IS_LOADING, true);

        // Cancel previous request if it was stored
        // Create new request token if exists
        if (CANCEL_TOKEN) CANCEL_TOKEN.cancel();
        CANCEL_TOKEN = axios.CancelToken.source();

        // Get releases
        // Transform releases
        const response = await new SearchProxy().searchReleases(search, {cancelToken: CANCEL_TOKEN});
        const releases = new SearchTransformer().fetchCollection(response || []);

        // Set searched releases
        commit(SET_RELEASES, releases);

      } catch (error) {
        if (!axios.isCancel(error)) {

          // Emit error
          // Throw error
          ErrorResolver.emitError('Произошла ошибка во время поиска релизов');
          throw error;

        }
      } finally {
        commit(SET_IS_LOADING, false);

      }
    },


    /**
     * Clear releases
     *
     * @param commit
     * @return {Promise<*>}
     */
    clearReleases: async ({commit}) => commit(SET_RELEASES, []),

  }
}
