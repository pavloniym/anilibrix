import Proxy from '@proxy'

export default class extends Proxy {
  constructor(parameters = {}) {
    super('https://www.anilibria.tv/public/api/index.php', parameters)
  }

  /**
   * Get user profile data
   *
   * @return {Promise}
   */
  identify() {
    return this.submit('post', this.endpoint, {query: 'user'});
  }
}
