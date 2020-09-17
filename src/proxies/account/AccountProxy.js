// Proxy
import BaseProxy from "@proxies/BaseProxy";

// Utils
import qs from 'qs'
import __get from "lodash/get";
import cookieParser from "set-cookie-parser";
import {handleResponseFromV1Api} from "@utils/requests/handleResponse";


export default class AccountProxy extends BaseProxy {


  /**
   * Login
   *
   * @param login
   * @param password
   * @return {Promise<*>}
   */
  async login({login, password}) {

    // Set form data
    // Make request to login endpoint
    const data = qs.stringify({mail: login, passwd: password});
    const response = await this.submit('POST', this.getApiV1Endpoint() + '/public/login.php', {data});
    const status = __get(response, 'data.key');

    // Get authorization status
    // If status === 'success' -> authorization is success
    if (status === 'success') {

      // Parse header cookies
      const header_cookies = __get(response, 'headers.set-cookie', null);
      const cookies = cookieParser(header_cookies, {map: true});
      const session = __get(cookies, 'PHPSESSID.value', null);

      // Get session
      // If session is not defined -> throw error
      if (session && session.length > 0) {
        return session

      } else throw new Error('Сессия не определена');
    } else throw new Error(__get(response, 'data.mes', 'Ошибка сервера'));
  }


  /**
   * Logout
   *
   * @return {Promise<*>}
   */
  async logout() {
    return await this.submit('POST', this.getApiV1Endpoint() + '/public/logout.php');
  }


  /**
   * Get profile
   *
   * @return {Promise}
   */
  async getProfile() {
    return handleResponseFromV1Api(
      await this.submit('POST', this.getApiV1Endpoint() + '/public/api/index.php', {
        data: qs.stringify({query: 'user'}),
        headers: this.getRequestHeaders(),
      })
    );
  }


  /**
   * Get profile avatar
   *
   * @param src
   * @return {string|null}
   */
  getAvatarPath(src) {
    return src
      ? this.getStaticEndpoint() + src
      : null;
  }

}
