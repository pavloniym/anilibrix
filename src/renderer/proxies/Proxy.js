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
    this.parameters = parameters
  }

  /**
   * Method used to set the query parameters.
   *
   * @param {Object} parameters The given parameters.
   *
   * @returns {BaseProxy} The instance of the proxy.
   */
  setParameters(parameters) {
    Object.keys(parameters)
      .forEach((key) => {
        this.parameters[key] = parameters[key]
      });

    return this
  }

  /**
   * Method used to set a single parameter.
   *
   * @param {string} parameter The given parameter.
   * @param {*} value The value to be set.
   *
   * @returns {BaseProxy} The instance of the proxy.
   */
  setParameter(parameter, value) {
    this.parameters[parameter] = value;

    return this
  }

  /**
   * Method used to remove all the parameters.
   *
   * @param {Array} parameters The given parameters.
   *
   * @returns {BaseProxy} The instance of the proxy.
   */
  removeParameters(parameters) {
    parameters.forEach((parameter) => {
      delete this.parameters[parameter]
    });

    return this
  }

  /**
   * Method used to remove a single parameter.
   *
   * @param {string} parameter The given parameter.
   *
   * @returns {BaseProxy} The instance of the proxy.
   */
  removeParameter(parameter) {
    delete this.parameters[parameter];

    return this
  }

  /**
   * The method used to perform an AJAX-request.
   *
   * @param {string}      requestType The request type.
   * @param {string}      url         The URL for the request.
   * @param {Object|null} data        The data to be send with the request.
   * @param withSession
   * @param parameters
   *
   * @returns {Promise} The result in a promise.
   */
  submit(requestType, url, data = null, withSession = true, parameters = null) {
    return this.submitWithProxy(requestType, url, data, withSession, parameters)
  }

  /**
   * Submit request directly, without proxy
   *
   * @param requestType
   * @param url
   * @param data
   * @param withSession
   * @param parameters
   * @return {Promise<any>}
   */
  submitDirectly(requestType, url, data = null, withSession = true, parameters = null) {
    return new Promise((resolve, reject) => {
      const requestUrl = url + this.getParameterString();
      const requestData = this.getFormDataObject(data);
      const requestCookieHeader = withSession ? `PHPSESSID=${this.getSessionCookieValue()}` : null;
      const requestParameters = { ...parameters, headers: { ...requestData.getHeaders(), Cookie: requestCookieHeader } };

      axios[requestType](requestUrl, requestData, requestParameters)
        .then(response => resolve(response))
        .catch(response => reject(response))
    })
  }

  /**
   * Submit request using proxy
   *
   * @param requestType
   * @param url
   * @param data
   * @param withSession
   * @param parameters
   * @return {Promise<void>}
   */
  submitWithProxy(requestType, url, data = null, withSession = true, parameters = null) {
    return new Promise((resolve, reject) => {
      const pacUrl = 'https://antizapret.prostovpn.org/proxy.pac';
      const targetUrl = url + this.getParameterString();

      getHttpProxy(pacUrl, targetUrl)
        .then(httpsProxyConfiguration => getHttpsAgent(httpsProxyConfiguration))
        .then(httpsAgent => this.submitDirectly(requestType, url, data, withSession, { ...parameters, httpsAgent }))
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  /**
   * Method used to fetch all items from the API.
   *
   * @returns {Promise} The result in a promise.
   */
  all() {
    return this.submit('get', `${this.endpoint}`)
  }

  /**
   * Method used to fetch a single item from the API.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  find(id) {
    return this.submit('get', `${this.endpoint}/${id}`)
  }

  /**
   * Method used to create an item.
   *
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  create(item) {
    return this.submit('post', `${this.endpoint}`, item)
  }

  /**
   * Method used to update an item.
   *
   * @param {int}    id   The given identifier.
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  update(id, item) {
    return this.submit('put', `${this.endpoint}/${id}`, item)
  }

  /**
   * Method used to destroy an item.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  destroy(id) {
    return this.submit('delete', `${this.endpoint}/${id}`)
  }

  /**
   * Method used to transform a parameters object to a parameters string.
   *
   * @returns {string} The parameter string.
   */
  getParameterString() {
    const keys = Object.keys(this.parameters);

    const parameterStrings = keys
      .filter(key => !!this.parameters[key])
      .map(key => `${key}=${this.parameters[key]}`);

    return parameterStrings.length === 0 ? '' : `?${parameterStrings.join('&')}`
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
      .keys(data)
      .forEach(key => formData.append(key, data[key]));

    return formData;
  }

  /**
   * Get session cookie value from store
   *
   * @return string|null
   */
  getSessionCookieValue() {
    const value = __get(store, 'state.settings.profile.session', null);
    console.log({ value });
    return value;
  }
}

export default BaseProxy
