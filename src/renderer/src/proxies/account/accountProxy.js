import {useBaseProxy} from "@proxies/base/baseProxy";
import {useAccountTransformer} from "@transformers/account/accountTransformer";

export function useAccountProxy() {

    // Bindings
    const {fetchAccount} = useAccountTransformer();
    const {submitRequest, applyEndpoint} = useBaseProxy();


    /**
     * Login
     *
     * @param login
     * @param password
     * @return {Promise<{response: *, sessionId: string|null}>}
     */
    const login = async ({login, password}) => {

        const response = await submitRequest({
            url: applyEndpoint('/public/login.php'),
            data: {mail: login, passwd: password, fa2code: ''},
            method: 'POST',
        });

        // Check status
        // Get session id from response
        const status = response?.status;
        const sessionId = response?.data?.sessionId;

        // If session is provided -> return this session
        if (status === 200 && sessionId?.length > 0) {
            return {
                response: response?.data,
                sessionId: sessionId,
            }
        }

        // Throw error if session is not defined
        throw new Error(response?.data?.mes || 'Ошибка сервера');
    }


    /**
     * Logout
     *
     * @return {Promise}
     */
    const logout = async () => {
        return await submitRequest({
            url: applyEndpoint('/public/logout.php'),
            method: 'POST',
        });
    }


    /**
     * Get profile
     *
     * @return {Promise<{response: *, profile: *}>}
     */
    const getProfile = async () => {

        const response = await submitRequest({
            url: applyEndpoint('/public/api/index.php'),
            data: {query: 'user'},
            method: 'POST',
        })

        return {
            profile: response?.data?.data ? fetchAccount(response?.data?.data) : null,
            response: response?.data,
        }
    }

    return {
        login,
        logout,
        getProfile,
    }
}
