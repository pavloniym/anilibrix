import BaseProxy from "@proxies/BaseProxy";

export default class ReleaseProxy extends BaseProxy {


  /**
   * Get last releases
   *
   * @return {Promise}
   */
  async getReleases(parameters = {}) {

    // Create params object
    const params = {
      limit: 14,
      playlist_type: 'array',
      description_type: 'no_view_order'
    };

    // Create request
    // Get response data
    const response = await this.submit('GET', this.getApiEndpoint() + '/getUpdates', {params, ...parameters});
    return response.data;
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
    const params = {data, ...parameters};
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
    const params = {data, ...parameters};
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
    return url
      ? await this.submit('GET', this.getStaticEndpoint() + url, {...parameters, responseType: 'arraybuffer'})
      : null;
  }


  /**
   * Get release poster
   *
   * @param src
   * @return {string|null}
   */
  getReleasePosterPath(src) {
    return src
      ? this.getStaticEndpoint() + src
      : null;
  }

}
