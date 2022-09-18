import FormData from 'form-data'
import {version, meta} from '@package'

export default class BaseProxy {

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
        // Add user-agent
        const axios = require('@plugins/axios').default;
        const headers = {...parameters.headers, ...this.getRequestHeaders()};

        // Make request
        // eslint-disable-next-line no-return-await
        return await axios.request({url, method, ...parameters, headers, timeout: 15000});

    }

    /**
     * Parse base response model
     *
     * @param response
     * @return {*}
     */
    handleResponse(response) {
        if (response?.status === true) {
            return response?.data;
        } else {
            throw new Error(response?.error?.message || 'Ошибка при запросе');
        }
    }

    /**
     * Get api endpoint url
     *
     * @return {string}
     */
    getApiEndpoint() {
        return require('@store/index').default?.state?.app?.settings?.system?.connection?.host;
    }

    /**
     * Get static endpoint url
     *
     * @return {string}
     */
    getStaticEndpoint() {
        return require('@store/index').default?.state?.app?.settings?.system?.connection?.host;
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
        Object.keys(data || {}).forEach(key => formData.append(key, typeof (data[key]) === 'object' ? JSON.stringify(data[key]) : data[key]));

        // Return form data
        return formData;
    }

    /**
     * Get default request headers
     *
     * @return {{}}
     */
    getRequestHeaders() {

        // Create headers
        const store = require('@store/index').default;
        const headers = {};

        // Set header user agent
        headers['user-agent'] = `${meta.name}/${version}`;

        // Set header session
        // Set session in cookies
        const session = store?.state?.app?.account?.session;

        if (session && session.length > 0) {
            headers.Cookie = `PHPSESSID=${session}; Path=/; Secure; HttpOnly`;
        }

        return headers;
    }
}
