import __get from 'lodash/get'
import axios from '@plugins/axios'

export default class BaseProxy {


  /**
   * Get api endpoint url
   *
   * @return {string}
   */
  getApiEndpoint() {
    return process.env.API_ENDPOINT_URL;
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
   * @param parameters
   *
   * @returns {Promise} The result in a promise.
   */
  async submit(method, url, parameters = {}) {

    // Set headers
    // Make request
    const headers = {...parameters.headers};
    return await axios.request({url, method, ...parameters, headers, timeout: 15000});
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
