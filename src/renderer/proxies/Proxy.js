import FormData from 'form-data'
import __get from 'lodash/get'

import axios from '@plugins/axios'
import { getHttpProxy, getHttpsAgent } from '@utils/proxy'
import store from '@store'

class BaseProxy {
  /**
   * The constructor of the BaseProxy.
   *
   * @param {string} endpoint   The endpoint being used.
   * @param {Object} parameters The parameters for the request.
   */
  constructor(endpoint, parameters = {}) {
    this.endpoint = endpoint;
    this.parameters = parameters;
    this.host = this.getHost();
  }

  /**
   * Get host
   *
   * @return {*}
   */
  getHost() {
    return __get(store, 'state.settings.connection.host', null);
  }

  /**
   * Detect proxy usage in settings
   * pac - pac url usage
   * custom - custom proxy host
   * direct - no proxy activated
   *
   * @return {string}
   */
  getProxyUsage() {
    const proxyConfiguration = __get(store, 'state.settings.connection.proxy');
    const pacActive = __get(proxyConfiguration, 'pac.active', false);
    const customActive = __get(proxyConfiguration, 'custom.active', false);

    if (pacActive) return 'pac';
    if (customActive) return 'custom';

    return 'direct';
  }

  /**
   * Get proxy https agent
   *
   * @param targetUrl
   * @return {Promise<any>}
   */
  getProxyHttpsAgent(targetUrl) {
    return new Promise((resolve, reject) => {
      const proxyUsage = this.getProxyUsage();

      if (proxyUsage === 'pac') {
        const pacUrl = __get(store, 'state.settings.connection.proxy.pac.url');
        if (pacUrl) {
          getHttpProxy(pacUrl, targetUrl)
            .then(httpsProxyConfiguration => getHttpsAgent(httpsProxyConfiguration))
            .then(httpsAgent => resolve(httpsAgent))
            .catch(error => reject(error));
        } else throw new Error('Pac Url is not defined');
      }
    });
  }

  /**
   * The method used to perform an AJAX-request.
   *
   * @param method
   * @param {string}      url         The URL for the request.
   * @param parameters
   *
   * @returns {Promise} The result in a promise.
   */
  submit(method, url, parameters = null) {
    const proxyUsage = this.getProxyUsage();

    if (proxyUsage !== 'direct') {
      // Should use proxy
      return this.submitWithProxy(method, url, parameters)
    } else {
      // Should make direct request
      return this.submitDirectly(method, url, parameters);
    }
  }

  /**
   * Submit request directly, without proxy
   *
   * @param method
   * @param url
   * @param parameters
   * @return {Promise<any>}
   */
  submitDirectly(method, url, parameters = null) {
    return new Promise((resolve, reject) => {
      axios.request({ url, method, ...parameters })
        .then(response => resolve(response.data))
        .catch(response => reject(response))
    })
  }

  /**
   * Submit request using proxy
   *
   * @param method
   * @param url
   * @param parameters
   * @return {Promise<void>}
   */
  submitWithProxy(method, url, parameters = null) {
    return new Promise(async (resolve, reject) => {

      // Get httpsAgent for proxy connection
      const httpsAgent = await this.getProxyHttpsAgent(url);

      // Make direct request, but with httpsAgent (having proxy)
      this.submitDirectly(method, url, { ...parameters, proxy: false, httpsAgent })
        .then(response => resolve(response))
        .catch(response => reject(response))
    });
  }

  /**
   * Get form data from provided data object
   *
   * @param data
   * @return {FormData}
   */
  getFormDataObject(data = null) {
    const formData = new FormData();

    Object
      .keys(data || {})
      .forEach(key => formData.append(key, data[key]));

    return formData;
  }
}

export default BaseProxy
