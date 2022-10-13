import BaseProxy from "@proxies/base/BaseProxy";

export default class AccountProxy extends BaseProxy {


    /**
     * Login
     *
     * @param login
     * @param password
     * @return {Promise}
     */
    async login({login, password}) {

        const response = await this.submit({
            url: `${this.getApiEndpoint()}/public/login.php`,
            data: {mail: login, passwd: password, fa2code: ''},
            method: 'POST',
        });

        // Check status
        // Get session id from response
        const status = response?.status;
        const sessionId = response?.data?.sessionId;

        // If session is provided -> return this session
        if (status === 200 && sessionId?.length > 0) return sessionId;

        // Throw error if session is not defined
        throw new Error(response?.data?.mes || 'Ошибка сервера');
    }


    /**
     * Logout
     *
     * @return {Promise<*>}
     */
    async logout() {
        return await this.submit({
            url: `${this.getApiEndpoint()}/public/logout.php`,
            method: 'POST',
        });
    }


    /**
     * Get profile
     *
     * @return {Promise}
     */
    async getProfile() {

        const response = await this.submit({
            url: `${this.getApiEndpoint()}/public/api/index.php`,
            data: {query: 'user'},
            method: 'POST',
        })

        return response?.data;
    }

}
