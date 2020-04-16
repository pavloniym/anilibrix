import Proxy from '@proxy'
import store from "@store";
import __get from "lodash/get";

export default class extends Proxy {
  constructor(parameters = {}) {
    super('/public/api/index.php', parameters)
  }

  /**
   * Get anilibria host
   *
   * @return {*}
   */
  getHost() {
    return __get(store, 'state.app.settings.connection.host', null);
  }


  /**
   * Parse base response model
   *
   * @param response
   * @return {*}
   */
  parseResponse(response) {
    const status = __get(response, 'status', false);
    const data = __get(response, 'data', null);
    const error = __get(response, 'error.message', 'Request error');

    if (status === true) {
      return data;
    } else {
      throw new Error(error);
    }
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

      return this.submit('POST', this.getHost() + this.endpoint, {data, headers})
        .then(response => resolve(this.parseResponse(response)))
        .catch(error => reject(error))
    });
  }


  /**
   * Get release with provided id
   *
   * @param releaseId
   * @param parameters
   * @return {Promise<unknown>}
   */
  getRelease(releaseId, parameters = {}) {
    return new Promise((resolve, reject) => {

      const data = this.getFormDataObject({query: 'release', id: releaseId});
      const headers = data.getHeaders();

      return this.submit('POST', this.getHost() + this.endpoint, {...parameters, data, headers})
        .then(response => resolve(this.parseResponse(response)))
        .catch(error => reject(error))
    });
  }


  /**
   * Get poster image
   *
   * @param posterSrc
   * @return {Promise<any>}
   */
  getPosterImage(posterSrc) {
    return new Promise((resolve, reject) => {
      return this.submit('GET', this.getHost() + posterSrc, {responseType: 'arraybuffer'})
        .then(response => resolve(Buffer.from(response, 'binary').toString('base64')))
        .catch(error => reject(error))
    })
  }


  /**
   * Get torrent file
   *
   * @param torrentUrl
   * @return {Promise<unknown>}
   */
  getTorrentFile(torrentUrl) {
    return new Promise((resolve, reject) => {
      return this.submit('GET', this.getHost() + torrentUrl, {responseType: 'arraybuffer'})
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  /**
   * Search releases by name
   *
   * @param searchQuery
   * @param parameters
   * @return {Promise<unknown>}
   */
  searchReleasesByName(searchQuery, parameters) {
    return new Promise((resolve, reject) => {

      const data = this.getFormDataObject({query: 'search', search: searchQuery});
      const headers = data.getHeaders();

      return this.submit('POST', this.getHost() + this.endpoint, {...parameters, data, headers})
        .then(response => resolve(this.parseResponse(response)))
        .catch(error => reject(error))
    })
  }

}
