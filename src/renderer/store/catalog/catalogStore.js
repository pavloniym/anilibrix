import AnilibriaProxy from "@proxies/anilibria";
import AnilibriaCatalogTransformer from "@transformers/anilibria/catalog";

import {Main} from '@main/utils/windows'
import __capitalize from 'lodash/capitalize'

const SET_FILTER_DATA = 'SET_FILTER_DATA';
const SET_FILTER_LOADING = 'SET_FILTER_LOADING';
const SET_CATALOG_LOADING = 'SET_CATALOG_LOADING';
const SET_PAGINATION_PAGE = 'SET_PAGINATION_PAGE';
const SET_CATALOG_RELEASES = 'SET_CATALOG_RELEASES';
const SET_CATALOG_PAGINATION = 'SET_CATALOG_PAGINATION';
const CLEAR_CATALOG_RELEASES = 'CLEAR_CATALOG_RELEASES';

export default {
  namespaced: true,
  state: {
    items: {
      data: [],
      page: 1,
      perPage: 15,
      loading: true,
      pagination: null,
    },
    filters: {
      genres: {
        items: [],
        value: [],
        loading: true,
      },
      years: {
        items: [],
        value: [],
        loading: true,
      },
      sort: 1,
    }
  },

  mutations: {

    /**
     * Set filter data
     *
     * @param s
     * @param filter
     * @param data
     * @return {*}
     */
    [SET_FILTER_DATA]: (s, {filter, data}) => s.filters[filter].items = data,


    /**
     * Set filter loading state
     *
     * @param s
     * @param filter
     * @param loading
     * @return {*}
     */
    [SET_FILTER_LOADING]: (s, {filter, loading}) => s.filters[filter].loading = loading,


    /**
     * Set loading state
     *
     * @param s
     * @param loading
     * @return {*}
     */
    [SET_CATALOG_LOADING]: (s, loading) => s.items.loading = loading,


    /**
     * Push release to items data array
     *
     * @param s
     * @param releases
     * @return {*}
     * @constructor
     */
    [SET_CATALOG_RELEASES]: (s, release) => s.items.data = [...s.items.data, ...release],


    /**
     * Clear catalog releases
     *
     * @param s
     * @return {*[]}
     */
    [CLEAR_CATALOG_RELEASES]: s => s.items.data = [],


    /**
     * Set catalog pagination
     *
     * @param s
     * @param pagination
     * @return {*}
     */
    [SET_CATALOG_PAGINATION]: (s, pagination) => s.items.pagination = pagination,

    /**
     * Set pagination page
     *
     * @param s
     * @param page
     * @return {*}
     */
    [SET_PAGINATION_PAGE]: (s, page) => s.items.page = page,

  },

  actions: {

    /**
     * Clear catalog releases
     *
     * @param commit
     * @return {*}
     */
    clearCatalogReleases: ({commit}) => commit(CLEAR_CATALOG_RELEASES),


    /**
     * Get catalog items
     *
     * @param commit
     * @param reset
     * @return {Promise<void>}
     */
    getCatalogItems: async ({commit, state}) => {
      try {

        // Set loading state
        commit(SET_CATALOG_LOADING, true);

        const sort = state.filters.sort;
        const page = state.items.page;
        const years = state.filters.years.value;
        const genres = state.filters.genres.value;
        const perPage = state.items.perPage;

        // Get items from server
        // Transform items
        const {items} = await new AnilibriaProxy().getCatalogItems({sort, genres, years, page, perPage});
        const releases = AnilibriaCatalogTransformer.fetchCollection(items);

        // Collect all poster images
        await Promise.allSettled(
          releases.map(async release => {
            release.poster.image = await new AnilibriaProxy().getPoster({src: release.poster.path});
          })
        );

        // Push catalog releases
        commit(SET_CATALOG_RELEASES, releases);

        // Set updated pagination data
        commit(SET_CATALOG_PAGINATION, {page, lastItems: items ? items.length : 0});

      } catch (error) {

        Main.sendToWindow('app:error', 'Произошла ошибка при загрузке релизов');
        Main.sendToWindow('app:error', error);

      } finally {

        commit(SET_CATALOG_LOADING, false);

      }
    },


    /**
     * Get genres filter
     *
     * @param commit
     * @return {Promise<void>}
     */
    getCatalogGenresFilter: async ({commit}) => {

      const filter = 'genres';

      try {

        commit(SET_FILTER_LOADING, {filter, loading: true});

        // Get data
        // Set filter data
        const data = (await new AnilibriaProxy().getCatalogGenres()).map(genre => __capitalize(genre));
        commit(SET_FILTER_DATA, {filter, data});

      } catch (error) {

        Main.sendToWindow('app:error', 'Произошла ошибка при загрузке фильтров по жанрам');
        Main.sendToWindow('app:error', error);

      } finally {

        commit(SET_FILTER_LOADING, {filter, loading: false});

      }
    },


    /**
     * Get years filter
     *
     * @param commit
     * @return {Promise<void>}
     */
    getCatalogYearsFilter: async ({commit}) => {

      const filter = 'years';

      try {

        commit(SET_FILTER_LOADING, {filter, loading: true});
        commit(SET_FILTER_DATA, {filter, data: await new AnilibriaProxy().getCatalogYears()});

      } catch (error) {

        Main.sendToWindow('app:error', 'Произошла ошибка при загрузке фильтров по годам');
        Main.sendToWindow('app:error', error);

      } finally {

        commit(SET_FILTER_LOADING, {filter, loading: false});

      }
    },


    /**
     * Set pagination page
     *
     * @param commit
     * @param page
     */
    setPaginationPage: ({commit}, page) => commit(SET_PAGINATION_PAGE, page),

  }

}
