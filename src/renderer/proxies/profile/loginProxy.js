import Proxy from '@proxy'
import setCookieParser from 'set-cookie-parser';
import __get from 'lodash/get';

export default class extends Proxy {
  constructor(parameters = {}) {
    super('https://www.anilibria.tv/public/login.php', parameters)
  }

  /**
   * Try to login
   *
   * @param login
   * @param password
   * @return {Promise}
   */
  authorize({login, password}) {
    return new Promise((resolve, reject) => {
      return this.submit('post', `${this.endpoint}`, {mail: login, passwd: password}, false)
        .then(response => {
          const data = response.data;
          const key = __get(data, 'key');
          const message = __get(data, 'mes');

          if (key === 'success') {
            const setCookies = __get(response, 'headers.set-cookie', null);
            const cookies = setCookieParser(setCookies);
            const PHPSESSID = (cookies || []).find(cookie => cookie.name === 'PHPSESSID');

            // If cookie is set -> resolve request
            if (PHPSESSID) {
              resolve(PHPSESSID.value);
            } else throw new Error('Can\'t parse session id from cookies')
          } else throw new Error(message);
        })
        .catch(error => reject(error));
    })
  }
}
