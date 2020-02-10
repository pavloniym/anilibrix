import FormData from 'form-data'
import __get from 'lodash/get'

import axios from '@plugins/axios'
import {getHttpProxy, getHttpsAgent} from '@utils/proxy'
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

    // Get main host url
    this.host = this.getHost();


    // Flag then proxy is failed and need to make new request with new proxy
    // Used only if PAC mode is enabled
    this.proxyRetry = false;
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

      if (this.getProxyUsage() === 'pac') {
        this.getPacProxy(targetUrl)
          .then(httpsAgent => resolve(httpsAgent))
          .catch(error => reject(error))
      }


    });
  }


  /**
   * Get pac proxy configuration
   *
   * @param targetUrl
   * @return {Promise<any>}
   */
  getPacProxy(targetUrl) {
    return new Promise((resolve, reject) => {

      // Get pac configuration
      // Get pac file source
      // Get pac proxy connection parameters
      const pacConfig = __get(store, 'state.settings.connection.proxy.pac');
      const pacSource = __get(pacConfig, 'source');
      const pacProxyConnection = __get(pacConfig, 'connection', {});


      if (pacProxyConnection.host && pacProxyConnection.port) {

        // If have proxy connection host and port in store use them
        // Create httpsAgent from stored values
        resolve(getHttpsAgent(pacProxyConnection));

      } else if (pacSource) {

        // If no stored proxy connection parameters
        // make request for new proxy host and port
        // save them in store and make httpsAgent

        getHttpProxy(pacSource, targetUrl)
          .then(httpsProxyConfiguration => {

            // Save new proxy configuration in store
            store.dispatch('settings/connection/setPacProxyConnection', httpsProxyConfiguration);

            // Create httpsAgent with new proxy parameters
            resolve(getHttpsAgent(httpsProxyConfiguration))

          })
          .catch(error => reject(error));

      } else reject('Pac proxy can\'t be resolved');
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
    if (this.getProxyUsage() !== 'direct') {

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
      axios.request({url, method, ...parameters})
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
      this.submitDirectly(method, url, {...parameters, proxy: false, httpsAgent})
        .then(response => resolve(response))
        .catch(response => {

          // If can't connect because of proxy fail
          // For proxy retry call and pac-proxy usage only:
          // 1. reset current proxy host
          // 2. try to get new proxy
          // 3. try to make new request
          if (response.code === 'ECONNRESET' && this.proxyRetry === false && this.getProxyUsage() === 'pac') {

            // Set proxyRetry flag
            this.proxyRetry = true;

            // Reset current proxy host parameters
            store.dispatch('settings/connection/clearPacProxyConnection');

            // Try to retry request + get new proxy first
            this.submitDirectly(method, url, parameters)
              .then(response => resolve(response))
              .catch(error => reject(error))

          } else {
            reject(response);
          }
        })
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
