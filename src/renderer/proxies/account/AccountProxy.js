// Proxy
import BaseProxy from "@proxies/BaseProxy";

// Utils
import __get from "lodash/get";

export default class AccountProxy extends BaseProxy {


  /**
   * Login
   *
   * @param login
   * @param password
   * @return {Promise<*>}
   */
  async login({login, password}) {

    const data = this.getFormDataObject({mail: login, passwd: password});
    const response = await this.submit('POST', this.getApiEndpoint() + '/public/login.php', {data});
    const status = __get(response, 'data.err');

    // Get status
    // If err === 'ok' -> authorization is success
    if (status !== 'ok') {
      throw new Error(__get(response, 'data.mes', 'Ошибка сервера'));
    }
  }


  /**
   * Logout
   *
   * @return {Promise<*>}
   */
  async logout() {
    return await this.submit('POST', this.getApiEndpoint() + '/public/logout.php');
  }


  /**
   * Get profile
   *
   * @return {Promise<*>}
   */
  async getProfile() {

    const data = this.getFormDataObject({query: 'user'});
    const response = await this.submit('POST', this.getApiEndpoint() + '/public/api/index.php', {data});

    return this.handleResponse(response.data);
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
