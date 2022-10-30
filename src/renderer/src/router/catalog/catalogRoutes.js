export const CATALOG_ROUTE = 'CATALOG_ROUTE';

export default [
    {
        name: CATALOG_ROUTE,
        path: '/catalog',
        meta: {showScroll: true},
        props: true,
        component: () => import('@views/catalog/CatalogView')
    }
]
