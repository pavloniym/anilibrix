// Utils
import router from '@router'

// Route names
export const RELEASE_ROUTE_NAME = 'release';


/**
 * Push to release
 *
 * @return {Promise<Route>}
 */
export const toRelease = (release_id) => {
  return router.push({
    name: RELEASE_ROUTE_NAME,
    params: {release_id}
  });
};


export default [
  {
    name: RELEASE_ROUTE_NAME,
    path: '/release/:release_id/',
    meta: {
      toolbar: {
        title: 'Релиз'
      }
    },
    props: true,
    component: () => import('@views/release')
  }
]
