import BaseProxy from '@/renderer/src/proxies/BaseProxy';

export default class ReleaseProxy extends BaseProxy {
  /**
   * Get last releases
   *
   * @return {Promise}
   */
  async getReleases(parameters = {}) {
    const data = this.getFormDataObject({ query: 'list', perPage: 14 });
    const params = { data, headers: data.getHeaders(), ...parameters };
    const response = await this.submit('POST', this.applyEndpoint() + '/public/api/index.php', params);

    return this.handleResponse(response.data);
  }

  /**
   * Get release with provided id
   *
   * @param releaseId
   * @param parameters
   * @return {Promise<unknown>}
   */
  async getRelease(releaseId, parameters = {}) {
    const data = this.getFormDataObject({ query: 'release', id: releaseId });
    const params = { data, headers: data.getHeaders(), ...parameters };
    const response = await this.submit('POST', this.applyEndpoint() + '/public/api/index.php', params);

    return this.handleResponse(response.data);
  }

  /**
   * Search releases by name
   *
   * @param searchQuery
   * @param parameters
   * @return {Promise<unknown>}
   */
  async searchReleases(searchQuery, parameters = {}) {
    const data = this.getFormDataObject({ query: 'search', search: searchQuery });
    const params = { data, headers: data.getHeaders(), ...parameters };
    const response = await this.submit('POST', this.applyEndpoint() + '/public/api/index.php', params);

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
      // eslint-disable-next-line no-return-await
      return await this.submit('GET', this.applyEndpoint() + url, {
        ...parameters, responseType: 'arraybuffer'
      });
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
