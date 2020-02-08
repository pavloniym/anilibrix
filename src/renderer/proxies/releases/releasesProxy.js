import Proxy from '@proxy'
import { parseBaseResponseModel } from '@utils/requests'

export default class extends Proxy {
  constructor(parameters = {}) {
    super('https://www.anilibria.tv/public/api/index.php', parameters)
  }

  /**
   * Get last 14 releases
   *
   * @return {Promise}
   */
  all() {
    return new Promise((resolve, reject) => {
      return this.submit('post', `${this.endpoint}`, { query: 'list', perPage: 14 })
        .then(response => resolve(parseBaseResponseModel(response)))
        .catch(error => reject(error))
    });
  }
}
