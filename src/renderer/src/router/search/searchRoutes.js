export const SEARCH_ROUTE = 'SEARCH_ROUTE';

export default [
    {
        name: SEARCH_ROUTE,
        path: '/search',
        component: () => import('@views/search/SearchView')
    }
]
