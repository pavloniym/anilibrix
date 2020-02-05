import Proxy from '@proxy'

export default class extends Proxy {
  constructor (parameters = {}) {
    super('https://anilibria.tv/public/login.php', parameters)
  }

  /**
   * Try to login
   *
   * @param login
   * @param password
   * @return {Promise}
   */
  authorize ({ login, password }) {
    return this.submit('post', `${this.endpoint}`, {
      mail: login,
      passwd: password
    })
  }
}
