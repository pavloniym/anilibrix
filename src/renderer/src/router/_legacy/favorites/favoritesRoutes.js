export const FAVORITES_ROUTE = 'FAVORITES_ROUTE';

export default [
    {
        name: FAVORITES_ROUTE,
        path: '/favorites',
        meta: {layout: {show_scroll: true}},
        props: true,
        component: () => import('@/renderer/src/views/favorites')
    }
]
