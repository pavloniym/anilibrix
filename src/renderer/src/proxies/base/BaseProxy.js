import {name, version} from '@package'

export default class BaseProxy {

    /**
     * The method used to perform an AJAX-request.
     *
     * @param url
     * @param data
     * @param params
     * @param method
     * @param headers
     * @param isFormData
     * @returns {Promise} The result in a promise.
     */
    async submit({url, method, data, params, headers, isFormData = true} = {}) {
        return await window.electron.makeHttpRequest(
            {
                url,
                data,
                params,
                method,
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
    async getApiEndpoint() {

        const req = () => import ('@store/app/settings/appSettingsStore');
        const store = await req();

        return store?.useAppSettingsStore()?.connectionHost;
    }


    /**
     * Get default request headers
     *
     * @return {Promise}
     */
    async getRequestHeaders({isFormData} = {}) {

        let headers = {};

        const req = () => import ('@store/app/account/appAccountStore');
        const store = await req();

        if (isFormData === true) headers['Content-Type'] = 'multipart/form-data';
        if (name && version) headers['User-Agent'] = `${name}/${version}`;
        if (store?.useAppAccountStore()?.sessionId) headers['Cookie'] = `PHPSESSID=${store?.useAppAccountStore()?.sessionId}; Path=/; Secure; HttpOnly`;

        return headers;
    }
}
