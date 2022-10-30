export const FAVORITES_ROUTE = 'FAVORITES_ROUTE';

export default [
    {
        name: FAVORITES_ROUTE,
        path: '/favorites',
        meta: {showScroll: true},
        component: () => import('@views/favorites/FavoritesView')
    }
]
