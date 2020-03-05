import Proxy from '@proxy'
import {parseBaseResponseModel} from '@utils/requests'

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

      const data = this.getFormDataObject({query: 'list', perPage: 14});
      const headers = data.getHeaders();

      return this.submit('POST', this.host + this.endpoint, {data, headers})
        .then(response => resolve(parseBaseResponseModel(response)))
        .catch(error => reject(error))
    });
  }


  /**
   * Get release with provided id
   *
   * @param releaseId
   * @return {Promise<unknown>}
   */
  getRelease(releaseId) {
    return new Promise((resolve, reject) => {

      const data = this.getFormDataObject({query: 'release', id: releaseId});
      const headers = data.getHeaders();

      return this.submit('POST', this.host + this.endpoint, {data, headers})
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
      return this.submit('GET', this.host + posterSrc, {responseType: 'arraybuffer'})
        .then(response => resolve(Buffer.from(response, 'binary').toString('base64')))
        .catch(error => reject(error))
    })
  }


  /**
   * Search releases by name
   *
   * @param searchQuery
   * @return {Promise<unknown>}
   */
  searchReleasesByName(searchQuery) {
    return new Promise((resolve, reject) => {

      const data = this.getFormDataObject({query: 'search', search: searchQuery});
      const headers = data.getHeaders();

      return this.submit('POST', this.host + this.endpoint, {data, headers})
        .then(response => resolve(parseBaseResponseModel(response)))
        .catch(error => reject(error))
    })
  }

}
