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

const debug = process.env.NODE_ENV !== 'production';
const axios = Axios.create();

// Add a request interceptor
axios.interceptors.request.use(
  (config) => config,
  (error) => {
    if (debug) console.log('Request error', { error });
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    if (debug) console.log({ config: response });
    return response;
  },
  (error) => {
    if (debug) console.log('Response error', { error });
    return Promise.reject(error);
  }
);

export default axios;
