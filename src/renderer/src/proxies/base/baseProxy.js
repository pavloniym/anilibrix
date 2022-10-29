// Utils
import {name, version} from "@package";

// Composables
import {useAccountStore} from "@store/account/accountStore";
import {useSettingsStore} from "@store/settings/settingsStore";

export function useBaseProxy() {
    

    /**
     * Submit request
     *
     * @param url
     * @param data
     * @param params
     * @param method
     * @param headers
     * @param timeout
     * @param isFormData
     * @return {Promise}
     */
    const submitRequest = async ({url, data, params, method, headers, timeout = 15000, isFormData = true}) => {
        return await window.electron.makeHttpRequest({
            url: url,
            data: data,
            params: params,
            method: method,
            timeout: timeout,
            headers: getRequestHeaders({headers, isFormData}),
        });
    }


    /**
     * Apply url to endpoint url
     *
     * @param url
     * @return {string}
     */
    const applyEndpoint = (url) => {
        return useSettingsStore()?.applyToConnectionHost(url);
    }


    /**
     * Get request headers
     *
     * @param headers
     * @param isFormData
     * @return {*}
     */
    const getRequestHeaders = ({headers, isFormData} = {}) => {

        let finalHeaders = {...(headers || {})};

        if (isFormData === true) finalHeaders['Content-Type'] = 'multipart/form-data';
        if (name && version) finalHeaders['User-Agent'] = `${name}/${version}`;
        if (useAccountStore()?.sessionId) finalHeaders['Cookie'] = `PHPSESSID=${useAccountStore()?.sessionId}; Path=/; Secure; HttpOnly`;

        return finalHeaders;

    }

    return {
        submitRequest,
        applyEndpoint,
    }
}
