// Store
import store from '@store'

// Utils
import qs from "qs";
import __get from 'lodash/get'
import {meta, version} from '@package'

// Resolvers
import RequestResolver from "@@/utils/resolvers/request";

export default class BaseProxy {

  /**
   * Get legacy api endpoint
   * Need for authorization and favorites requests
   *
   * @return {string}
   */
  getApiV1Endpoint() {
    return process.env.API_V1_ENDPOINT_URL;
  }

  /**
   * Get static endpoint url
   *
   * @return {string}
   */
  getStaticEndpoint() {
    return process.env.STATIC_ENDPOINT_URL;
  }


  /**
   * The method used to perform an AJAX-request.
   *
   * @param method
   * @param {string}  url The URL for the request.
   * @param config
   *
   * @returns {Promise} The result in a promise.
   */
  async submit(method, url, config = {}) {
    return await RequestResolver.make({
      url,
      method,
      timeout: 15000,
      headers: this.getRequestHeaders(),
      ...config,
    });
  }


  /**
   * Get default request headers
   *
   * @return {{}}
   */
  getRequestHeaders() {

    // Create headers
    const headers = {};

    // Set header session
    // Set session in cookies
    const session = __get(store, 'state.app.account.session');
    if (session && session.length > 0) {
      headers.Cookie = `PHPSESSID=${session}; Path=/; Secure; HttpOnly`;
    }

    return headers;
  }


  /**
   * Prepare query string from provided data
   *
   * @param data
   * @return {string}
   */
  prepareFormData(data = {}) {
    return qs.stringify(data);
  }

}
