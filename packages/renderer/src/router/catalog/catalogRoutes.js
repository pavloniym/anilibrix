export const CATALOG_ROUTE = 'CATALOG_ROUTE';

export default [
    {
        name: CATALOG_ROUTE,
        path: '/catalog',
        meta: {layout: {show_scroll: true}},
        props: true,
        component: () => import('@/renderer/src/views/catalog')
    }
]
