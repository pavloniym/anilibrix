import router from '@router'

export const CATALOG_ROUTE_NAME = 'catalog';

/**
 * Push to catalog
 *
 * @return {Promise<Route>}
 */
export const toCatalog = () => router.push({name: CATALOG_ROUTE_NAME});


export default [
  {
    name: CATALOG_ROUTE_NAME,
    path: '/catalog',
    props: true,
    component: () => import('@views/catalog'),
  }
]
