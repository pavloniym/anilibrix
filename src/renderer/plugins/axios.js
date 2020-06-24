/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * @see https://github.com/mzabriskie/axios
 *
 */
import Axios from 'axios'
import store from '@store'
import __get from 'lodash/get'

// Create axios
const axios = Axios.create();

// Set cookies
axios.defaults.withCredentials = true;

/**
 * Error handler function
 *
 * @param error
 * @return {Promise<never>}
 */
const responseErrorHandler = async error => {
  if (error && error.response) {

    // If server responded with not authorized:
    if (error.response.status === 401) {

      // Clear session and profile data
      await store.dispatch('app/account/setSession');
      await store.dispatch('app/account/setProfile');
    }
  }

  return Promise.reject(error);
};


/**
 * Set response success handler
 *
 * @param response
 * @return {Promise<*>}
 */
const responseSuccessHandler = async response => {

  // Update PHPSESSID from response
  return response;

};


/**
 * Set request handler
 *
 * @return {function(*): *}
 * @param config
 */
const requestHandler = (config) => {

  // Set header session
  // Set session in cookies
  const session = __get(store, 'state.app.account.session');
  if (session && session.length > 0) {
    config.headers.Cookie = `PHPSESSID=${session}`
  }

  return config;
};


// Add request && response interceptors
axios.interceptors.request.use(requestHandler, error => error);
//axios.interceptors.response.use(responseSuccessHandler, responseErrorHandler);


export default axios;
