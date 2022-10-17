import {name, version} from '@package'

export default class BaseProxy {

    /**
     * The method used to perform an AJAX-request.
     *
     * @param url
     * @param data
     * @param params
     * @param method
     * @param signal
     * @param headers
     * @param isFormData
     * @returns {Promise} The result in a promise.
     */
    async submit({url, method, data, params, headers, signal = null, isFormData = true} = {}) {
        return await window.electron.makeHttpRequest(
            {
                url,
                data,
                params,
                method,
                signal,
                headers: {...headers, ...(await this.getRequestHeaders({isFormData}))},
                timeout: 15000,
            }
        );
    }

    /**
     * Get api endpoint url
     *
     * @return {Promise}
     */
    async applyEndpoint(url) {

        const req = () => import ('@store/settings/settingsStore');
        const store = await req();

        return store?.useSettingsStore()?.applyToConnectionHost(url);
    }


    /**
     * Get default request headers
     *
     * @return {Promise}
     */
    async getRequestHeaders({isFormData} = {}) {

        let headers = {};

        const req = () => import ('@store/account/accountStore');
        const store = await req();

        if (isFormData === true) headers['Content-Type'] = 'multipart/form-data';
        if (name && version) headers['User-Agent'] = `${name}/${version}`;
        if (store?.useAccountStore()?.sessionId) headers['Cookie'] = `PHPSESSID=${store?.useAccountStore()?.sessionId}; Path=/; Secure; HttpOnly`;

        return headers;
    }


    abortRequest(abortController = null) {
        if (abortController) {

        }

        return this;
    }
}
