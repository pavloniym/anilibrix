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
import Axios from '@/renderer/src/plugins/axios'
import store from '@/renderer/src/store'

// Set cookies
Axios.defaults.withCredentials = true;

// Create axios
const axios = Axios.create();

/**
 * Error handler function
 *
 * @param error
 * @return {Promise<never>}
 */
const responseErrorHandler = async error => {

  // If server responded with not authorized:
  if (error?.response?.status === 401) {

    const accountStorage = require('@/renderer/src/store/app/account/appAccountStore')

    // Clear session and profile data
    await store.commit('app/account/' + accountStorage.SET_SESSION_MUTATION);
    await store.commit('app/account/' + accountStorage.SET_SESSION_MUTATION);

  }

  if (error?.response?.status !== 401) {
    console.log(error);
  }

  return Promise.reject(error);
};

// Add request && response interceptors
axios.interceptors.response.use(request => request, responseErrorHandler);

export default axios;
