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

// Create axios
const axios = Axios.create();

// Set cookies
axios.defaults.withCredentials = false;

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


// Add request && response interceptors
axios.interceptors.response.use(request => request, responseErrorHandler);

export default axios;
