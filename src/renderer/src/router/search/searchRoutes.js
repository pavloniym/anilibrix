export const SEARCH_ROUTE = 'SEARCH_ROUTE';

export default [
    {
        name: SEARCH_ROUTE,
        path: '/search',
        meta: {showScroll: true},
        component: () => import('@views/search/SearchView')
    }
]
