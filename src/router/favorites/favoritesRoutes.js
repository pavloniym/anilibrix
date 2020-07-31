import router from '@router'

export const FAVORITES_ROUTE_NAME = 'favorites';

/**
 * Push to favorites
 *
 * @return {Promise<Route>}
 */
export const toFavorites = () => router.push({name: FAVORITES_ROUTE_NAME});


export default [
  {
    name: FAVORITES_ROUTE_NAME,
    path: '/favorites',
    props: true,
    component: () => import('@views/favorites'),
  }
]
