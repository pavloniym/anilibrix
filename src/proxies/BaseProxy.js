// Utils
import __get from 'lodash/get'
import axios from '@plugins/axios'

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

    let temp = config;
    temp.cancelToken = undefined;

    return await RequestResolver.make({url, method, ...temp, timeout: 15000});
    //return await axios.request({url, method, ...config, timeout: 15000});
  }


  /**
   * Parse base response model
   *
   * @param response
   * @return {*}
   */
  handleResponse(response) {

    const data = __get(response, 'data', null);
    const status = __get(response, 'status', false);
    const message = __get(response, 'error.message', 'Ошибка при запросе');

    if (status === true) {
      return data;

    } else {
      throw new Error(message);
    }
  }


  /**
   * Get form data from provided data object
   *
   * @param data
   * @return {FormData}
   */
  getFormDataObject(data = null) {

    // Create form data object
    const formData = new FormData();

    // Set data
    Object.keys(data || {})
      .forEach(key => formData.append(key, typeof (data[key]) === 'object' ? JSON.stringify(data[key]) : data[key]));

    // Return form data
    return formData;
  }

}
