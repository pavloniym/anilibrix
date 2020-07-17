import BaseProxy from "@proxies/BaseProxy";

export default class ReleaseProxy extends BaseProxy {


  /**
   * Get last releases
   *
   * @return {Promise}
   */
  async getReleases(parameters = {}) {

    const data = this.getFormDataObject({query: 'list', perPage: 14});
    const params = {data, headers: data.getHeaders(), ...parameters};
    const response = await this.submit('POST', this.getApiEndpoint() + '/public/api/index.php', params);

    return this.handleResponse(response.data);
  }


  /**
   * Get release with provided id
   *
   * @param release_id
   * @param parameters
   * @return {Promise<unknown>}
   */
  async getRelease(release_id, parameters = {}) {

    const data = this.getFormDataObject({query: 'release', id: release_id});
    const params = {data, headers: data.getHeaders(), ...parameters};
    const response = await this.submit('POST', this.getApiEndpoint() + '/public/api/index.php', params);

    return this.handleResponse(response.data);
  }


  /**
   * Search releases by name
   *
   * @param search_query
   * @param parameters
   * @return {Promise<unknown>}
   */
  async searchReleases(search_query, parameters = {}) {

    const data = this.getFormDataObject({query: 'search', search: search_query});
    const params = {data, headers: data.getHeaders(), ...parameters};
    const response = await this.submit('POST', this.getApiEndpoint() + '/public/api/index.php', params);

    return this.handleResponse(response.data);
  }


  /**
   * Get torrent file
   *
   * @param url
   * @param parameters
   * @return {Promise<unknown>}
   */
  async getReleaseTorrent(url, parameters = {}) {
    if (url) {
      return await this.submit('GET', this.getStaticEndpoint() + url, {...parameters, responseType: 'arraybuffer'});
    } else return null;
  }


  /**
   * Get release poster
   *
   * @param src
   * @return {string|null}
   */
  getReleasePosterPath(src) {
    return src ? this.getStaticEndpoint() + src : null;
  }

}
