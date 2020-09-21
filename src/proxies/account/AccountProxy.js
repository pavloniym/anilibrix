// Proxy
import BaseProxy from "@proxies/BaseProxy";

// Utils
import __get from "lodash/get";
import cookieParser from "set-cookie-parser";

// Responses
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
    const response = await this.submit('POST', this.getApiV1Endpoint() + '/public/login.php', {
      data: this.prepareFormData({mail: login, passwd: password}),
    });

    // Get login status
    const status = __get(response, 'data.key');

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
        data: this.prepareFormData({query: 'user'}),
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
