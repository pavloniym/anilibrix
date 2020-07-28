import __get from 'lodash/get'
import router from '@router'

const VIDEO_VIEW = 'video';
const BLANK_VIEW = 'blank';
const RELEASE_VIEW = 'release';
const RELEASES_VIEW = 'releases';
const ACCOUNT_LOGIN_VIEW = 'account.login';


/**
 * Go to login view
 * Check current route
 *
 * @return {Promise}
 */
export const toLogin = () => {
  if (router.currentRoute.name !== ACCOUNT_LOGIN_VIEW) {
    return router.push({name: ACCOUNT_LOGIN_VIEW});
  }
};


/**
 * Go to release
 *
 * @param release
 * @return {Promise}
 */
export const toRelease = (release = null) => {
  if (release) {

    const releaseId = __get(release, 'id');
    const releaseName = __get(release, 'names.original');

    return router.push({
      name: RELEASE_VIEW,
      params: {releaseId, releaseName}
    });
  }
};


/**
 * Go to releases
 *
 * @return {Promise<Route>}
 */
export const toReleases = () => {
  return router.push({name: RELEASES_VIEW});
};


/**
 * Go to video
 *
 * @param release
 * @param episode
 * @param params
 * @return {Promise<Route>}
 */
export const toVideo = (release = null, episode = null, params = {}) => {
  if (release && episode) {

    const key = `${release.id}:${episode.id}`;
    const releaseName = __get(release, 'names.original');

    return router.push({
      name: VIDEO_VIEW,
      params: {key, release, episode, releaseName, ...params}
    });
  }
};


/**
 * Go to blank view
 *
 * @param message
 * @param referer
 * @return {Promise<Route>}
 */
export const toBlank = (message = null, referer = null) => {
  return router.push({name: BLANK_VIEW, params: {message, referer}})
};
