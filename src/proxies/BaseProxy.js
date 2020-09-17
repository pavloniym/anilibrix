// Store
import store from '@store'

// Utils
import __get from 'lodash/get'
import {meta, version} from '@package'

// Resolvers
import RequestResolver from "@@/utils/resolvers/request";

export default class BaseProxy {


  /**
   * Get api endpoint url
   *
   * @return {string}
   */
  getApiEndpoint() {
    return process.env.API_V2_ENDPOINT_URL;
  }


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
    return await RequestResolver.make({url, method, ...config, timeout: 15000});
  }



  /**
   * Get default request headers
   *
   * @return {{}}
   */
  getRequestHeaders() {

    // Create headers
    const headers = {};

    // Set header user agent
    headers.UserAgent = `${meta.name}/${version}`;

    // Set header session
    // Set session in cookies
    const session = __get(store, 'state.app.account.session');
    if (session && session.length > 0) headers.Cookie = `PHPSESSID=${session}; Path=/; Secure; HttpOnly`;

    return headers;
  }

}
