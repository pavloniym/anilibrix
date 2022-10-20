import SearchView from '@views/search/SearchView'

export const SEARCH_ROUTE = 'SEARCH_ROUTE';

export default [
    {
        name: SEARCH_ROUTE,
        path: '/search',
        meta: {showScroll: true},
        component: SearchView
    }
]
