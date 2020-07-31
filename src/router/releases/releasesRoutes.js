import router from '@router'

export const RELEASES_ROUTE_NAME = 'releases';

/**
 * Push to release
 *
 * @return {Promise<Route>}
 */
export const toReleases = () => router.push({name: RELEASES_ROUTE_NAME});


export default [
  {
    name: RELEASES_ROUTE_NAME,
    path: '/',
    component: () => import('@views/releases')
  }
]
