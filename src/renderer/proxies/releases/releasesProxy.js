import Proxy from '@proxy'
import { parseBaseResponseModel } from '@utils/requests'

export default class extends Proxy {
  constructor(parameters = {}) {
    super('/public/api/index.php', parameters)
  }

  /**
   * Get last 14 releases
   *
   * @return {Promise}
   */
  getReleases() {
    return new Promise((resolve, reject) => {
      const data = this.getFormDataObject({ query: 'list', perPage: 14 });
      const headers = data.getHeaders();

      return this.submit('POST', this.host + this.endpoint, { data, headers })
        .then(response => resolve(parseBaseResponseModel(response)))
        .catch(error => reject(error))
    });
  }

  /**
   * Get poster image
   * Save it on disk
   *
   * @param posterSrc
   * @return {Promise<any>}
   */
  getPosterImage(posterSrc) {
    return new Promise((resolve, reject) => {
      return this.submit('GET', this.host + posterSrc, { responseType: 'arraybuffer' })
        .then(response => resolve(Buffer.from(response, 'binary').toString('base64')))
        .catch(error => reject(error))
    })
  }
}
