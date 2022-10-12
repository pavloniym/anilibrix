// Proxy
import BaseProxy from '@/renderer/src/proxies/BaseProxy';

// Utils
import cookieParser from 'set-cookie-parser';

export default class AccountProxy extends BaseProxy {


    /**
     * Login
     *
     * @param login
     * @param password
     * @return {Promise<*>}
     */
    async login({login, password}) {
        const data = this.getFormDataObject({mail: login, passwd: password, fa2code: ''});
        const params = {data, headers: data.getHeaders()};
        const response = await this.submit('POST', this.getApiEndpoint() + '/public/login.php', params);
        const status = response?.data?.err;

        // Get status
        // If err === 'ok' -> authorization is success
        if (status === 'ok') {
            // Parse header cookies
            const headerCookies = response?.headers?.['set-cookie'] || null;
            const cookies = cookieParser(headerCookies, {map: true});
            const session = cookies?.PHPSESSID?.value || null;

            // Get session
            // If session is not defined -> throw error
            if (session && session.length > 0) {
                return session
            } else {
                throw new Error('Сессия не определена');
            }
        } else {
            throw new Error(response?.data?.mes || 'Ошибка сервера');
        }
    }

    /**
     * Logout
     *
     * @return {Promise<*>}
     */
    async logout() {
        // eslint-disable-next-line no-return-await
        return await this.submit('POST', this.getApiEndpoint() + '/public/logout.php');
    }

    /**
     * Get profile
     *
     * @return {Promise<*>}
     */
    async getProfile() {
        const data = this.getFormDataObject({query: 'user'});
        const params = {data, headers: data.getHeaders()};
        const response = await this.submit('POST', this.getApiEndpoint() + '/public/api/index.php', params);

        return this.handleResponse(response.data);
    }

    /**
     * Get profile avatar
     *
     * @param src
     * @return {string|null}
     */
    getAvatarPath(src) {
        return src ? this.getStaticEndpoint() + src : null;
    }
}
