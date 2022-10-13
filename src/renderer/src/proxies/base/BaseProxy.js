import {name, version} from '@package'
import {useAppAccountStore} from '@store/app/account/appAccountStore'
import {useAppSettingsStore} from '@store/app/settings/appSettingsStore'

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
                headers: {...headers, ...this.getRequestHeaders({isFormData})},
                timeout: 15000,
            }
        );
    }

    /**
     * Get api endpoint url
     *
     * @return {string}
     */
    getApiEndpoint() {
        return useAppSettingsStore()?.connectionHost;
    }


    /**
     * Get default request headers
     *
     * @return {*}
     */
    getRequestHeaders({isFormData} = {}) {

        let headers = {};

        if (isFormData === true) headers['Content-Type'] = 'multipart/form-data';
        if (name && version) headers['User-Agent'] = `${name}/${version}`;
        if (useAppAccountStore()?.sessionId) headers['Cookie'] = `PHPSESSID=${useAppAccountStore()?.sessionId}; Path=/; Secure; HttpOnly`;

        return headers;
    }
}
