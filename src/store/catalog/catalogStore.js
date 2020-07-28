// Proxy
import CatalogProxy from "@proxies/catalog";
import ReleaseProxy from "@proxies/release";

// Transformer
import CatalogTransformer from "@transformers/catalog";

// Utils
import __capitalize from 'lodash/capitalize'

// Handlers
// import {emitAppError} from "@main/handlers/notifications/notificationsHandler";


// Mutations
const SET_INITIALIZED = 'SET_INITIALIZED';
const SET_FILTER_DATA = 'SET_FILTER_DATA';
const SET_FILTER_VALUE = 'SET_FILTER_VALUE';
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
      perPage: 12,
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
      sort: {
        value: 1
      },
    },
    is_initialized: false
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
     * Set filter value
     *
     * @param s
     * @param filter
     * @param value
     * @return {*}
     */
    [SET_FILTER_VALUE]: (s, {filter, value}) => s.filters[filter].value = value,


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


    /**
     * Set initialized
     *
     * @param s
     * @return {boolean}
     */
    [SET_INITIALIZED]: s => s.is_initialized = true,

  },

  actions: {

    /**
     * Get catalog items
     *
     * @param commit
     * @param reset
     * @return {Promise<void>}
     */
    getCatalogItems: async ({commit, state}) => {
      try {

        // Set initialized state
        // Set loading state
        commit(SET_INITIALIZED);
        commit(SET_CATALOG_LOADING, true);

        const sort = state.filters.sort.value;
        const page = state.items.page;
        const years = state.filters.years.value;
        const genres = state.filters.genres.value;
        const perPage = state.items.perPage;

        // Get items from server
        // Transform items
        const {items} = await new CatalogProxy().getCatalogReleases({sort, genres, years, page, perPage});
        const releases = new CatalogTransformer().fetchCollection(items);

        // Get processed releases
        // Get poster path
        const processedReleases = releases
          .map(release => ({...release, poster: new ReleaseProxy().getReleasePosterPath(release.poster)}));

        // Push catalog releases
        // Set updated pagination data
        commit(SET_CATALOG_RELEASES, processedReleases);
        commit(SET_CATALOG_PAGINATION, {page, lastItems: processedReleases ? processedReleases.length : 0});

      } catch (error) {

        // Show app error
        // Throw error
        emitAppError('Произошла ошибка при загрузке релизов');
        throw error;

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
        const data = (await new CatalogProxy().getCatalogGenres()).map(genre => __capitalize(genre));
        commit(SET_FILTER_DATA, {filter, data});

      } catch (error) {

        // Show app error
        // Throw error
        emitAppError('Произошла ошибка при загрузке фильтров по жанрам');
        throw error;

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

        // Get data
        // Set filter data
        const data = await new CatalogProxy().getCatalogYears();
        commit(SET_FILTER_DATA, {filter, data});

      } catch (error) {

        // Show app error
        // Throw error
        emitAppError('Произошла ошибка при загрузке фильтров по годам');
        throw error;

      } finally {
        commit(SET_FILTER_LOADING, {filter, loading: false});

      }
    },


    /**
     * Clear catalog releases
     *
     * @param commit
     * @return {*}
     */
    clearCatalogReleases: ({commit}) => commit(CLEAR_CATALOG_RELEASES),


    /**
     * Set filter value
     *
     * @param commit
     * @param filter
     * @param value
     * @return {*}
     */
    setFilterValue: ({commit}, {filter, value}) => commit(SET_FILTER_VALUE, {filter, value}),


    /**
     * Set pagination page
     *
     * @param commit
     * @param page
     */
    setPaginationPage: ({commit}, page) => commit(SET_PAGINATION_PAGE, page),

  }

}
