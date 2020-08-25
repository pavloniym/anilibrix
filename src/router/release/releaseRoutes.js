// Utils
import router from '@router'
import __get from "lodash/get";

// Route names
export const RELEASE_ROUTE_NAME = 'release';


/**
 * Push to release
 *
 * @return {Promise<Route>}
 */
export const toRelease = (release) => {
  if (release) {

    const releaseId = __get(release, 'id');
    const releaseName = __get(release, 'names.original');

    return router.push({
      name: RELEASE_ROUTE_NAME,
      params: {releaseId, releaseName}
    });
  }
};


export default [
  {
    name: RELEASE_ROUTE_NAME,
    path: '/release/:releaseId/:releaseName',
    meta: {
      toolbar: {title: 'Релиз'}
    },
    props: true,
    component: () => import('@views/release')
  }
]
