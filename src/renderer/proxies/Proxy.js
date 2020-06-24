import __get from 'lodash/get'
import axios from '@plugins/axios'
import FormData from 'form-data'
import {getHttpProxy, getHttpsAgent} from '@utils/proxy'
import {version, meta} from '@package'

export default class Proxy {

  /**
   * The constructor of the BaseProxy.
   *
   * @param {string} endpoint   The endpoint being used.
   * @param {Object} parameters The parameters for the request.
   */
  constructor(endpoint, parameters = {}) {
    this.endpoint = endpoint;
    this.userAgent = `${meta.name}/${version}`;
    this.parameters = parameters;
  }


  /**
   * The method used to perform an AJAX-request.
   *
   * @param method
   * @param {string}  url The URL for the request.
   * @param parameters
   *
   * @returns {Promise} The result in a promise.
   */
  async submit(method, url, parameters = null) {

    // Create object with request arguments
    const request = {method, url, parameters};

    return this._getProxyUsage() === true
      ? await this._requestWithProxy(request)
      : await this._requestDirectly(request);
  }


  /**
   * Submit request directly, without proxy
   *
   * @param method
   * @param url
   * @param parameters
   * @return {Promise<any>}
   */
  async _requestDirectly({method, url, parameters = null}) {

    // Set headers
    // Add user-agent
    const headers = {...parameters.headers, ...this._getRequestHeaders()};

    // Make request
    return await axios.request({url, method, ...parameters, headers, timeout: 15000})
  }


  /**
   * Submit request with proxy
   *
   * @param method
   * @param url
   * @param parameters
   * @return {Promise<any>}
   * @private
   */
  async _requestWithProxy({method, url, parameters = null} = {}) {
    try {

      // Get httpsAgent for proxy connection
      const httpsAgent = await this._getProxyHttpsAgent(url);

      // Make direct request, but with httpsAgent (having proxy)
      return await this._requestDirectly({method, url, parameters: {...parameters, httpsAgent, proxy: false}})

    } catch (error) {

      // If pac proxy use
      // Clear proxy pac connection
      if (this._getProxyPacUsage()) this._clearProxyPacConnection();

      // Throw error
      throw error;
    }
  }


  /**
   * Get proxy usage
   *
   * @return {boolean}
   * @private
   */
  _getProxyUsage() {
    return this._getProxyPacUsage() === true || this._getProxyCustomUsage() === true;
  }


  /**
   * Get pac proxy usage state
   *
   * @return {boolean}
   */
  _getProxyPacUsage() {
    return false;
  }


  /**
   * Get custom proxy usage state
   *
   * @return {boolean}
   */
  _getProxyCustomUsage() {
    return false;
  }


  /**
   * Get pac proxy configuration
   *
   * @return {{port: *, host: *, direct: *, source: *}}
   * @private
   */
  _getProxyPacConfiguration() {
    return {};
  }


  /**
   * Get custom proxy configuration
   *
   * @return {{port: *, host: *}}
   * @private
   */
  _getProxyCustomConfiguration() {
    return {};
  }


  /**
   * Set proxy pac configuration
   *
   * @param host
   * @param port
   * @param direct
   * @private
   */
  _setProxyPacConfiguration({host = null, port = null, direct = false} = {}) {
    //
  }


  /**
   * Clear proxy pac connection
   *
   * @private
   */
  _clearProxyPacConnection() {
    //
  }


  /**
   * Get proxy https agent
   *
   * @return {Promise<any>}
   * @param url
   */
  async _getProxyHttpsAgent(url) {
    if (this._getProxyUsage()) {

      // If PAC proxy is used
      if (this._getProxyPacUsage()) {
        return await this._getProxyPacAgent(url);
      }

      // if CUSTOM proxy is used
      if (this._getProxyCustomUsage()) {
        return await this._getProxyCustomAgent();
      }
    }

    return null;
  }

  /**
   * Get pac proxy configuration
   *
   * @param url
   * @return Promise
   */
  async _getProxyPacAgent(url) {

    const configuration = this._getProxyPacConfiguration();

    // Get pac configuration
    const host = __get(configuration, 'host');
    const port = __get(configuration, 'port');
    const direct = __get(configuration, 'direct');
    const source = __get(configuration, 'source');

    if (direct === true) {

      // If direct connection
      return null;

    } else if (host && port) {

      // If have proxy connection host and port in store use them
      // Create httpsAgent from stored values
      try {
        return getHttpsAgent({host, port});
      } catch (error) {
        throw new Error('Ошибка при создании httpsAgent: ' + error);
      }

    } else if (source) {

      // If no stored proxy connection parameters
      try {

        // make request for new proxy host and port
        // save them and make httpsAgent
        const proxy = await getHttpProxy({source, url});

        // Save new proxy configuration in store
        await this._setProxyPacConfiguration(proxy);

        // Check proxy config has host and port
        // Resolve https agent
        return proxy.host && proxy.port
          ? getHttpsAgent(proxy)
          : null;

      } catch (error) {
        throw new Error('Ошибка при создании httpsAgent из PAC скрипта: ' + error);
      }

    } else {
      throw new Error('Некорректные настройки PAC-прокси');
    }
  }


  /**
   * Get custom proxy httpsAgent
   *
   * @return {*}
   */
  async _getProxyCustomAgent() {

    try {

      const configuration = this._getProxyCustomConfiguration();

      // Get custom configuration
      const host = __get(configuration, 'host');
      const port = parseInt(__get(configuration, 'port'));

      // Create https agent
      if (host && port) {
        return getHttpsAgent({host, port});
      }

      return null;
    } catch (error) {
      throw new Error(`Ошибка при создании httpsAgent из кастомного прокси: ${error.message}`);
    }

  }


  /**
   * Get form data from provided data object
   *
   * @param data
   * @return {FormData}
   */
  _getFormDataObject(data = null) {

    // Create form data object
    const formData = new FormData();

    // Set data
    Object.keys(data || {})
      .forEach(key => formData.append(key, typeof (data[key]) === 'object' ? JSON.stringify(data[key]) : data[key]));

    // Return form data
    return formData;
  }


  /**
   * Get default request headers
   *
   * @return {{}}
   */
  _getRequestHeaders() {
    return {
      'User-Agent': this.userAgent
    }
  }

}
