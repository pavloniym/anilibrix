// Proxy
import BaseProxy from "@proxies/BaseProxy";

// Utils
import {handleResponseFromV1Api} from "@utils/requests/handleResponse";

export default class ReleaseProxy extends BaseProxy {


  /**
   * Get last releases
   *
   * @return {Promise}
   */
  async getReleases(configuration = {}) {
    const {items} = handleResponseFromV1Api(
      await this.submit('POST', this.getApiV1Endpoint() + '/public/api/index.php', {
        ...configuration,
        data: this.prepareFormData({query: 'list', perPage: 15}),
      })
    );
    return items;
  }


  /**
   * Get release with provided id
   *
   * @param release_id
   * @param configuration
   * @return {Promise}
   */
  async getRelease(release_id, configuration = {}) {
    return handleResponseFromV1Api(
      await this.submit('POST', this.getApiV1Endpoint() + '/public/api/index.php', {
        ...configuration,
        data: this.prepareFormData({query: 'release', id: release_id}),
      })
    );
  }


  /**
   * Search releases by name
   *
   * @param search
   * @param configuration
   * @return {Promise}
   */
  async searchReleases(search, configuration = {}) {
    const {items} = handleResponseFromV1Api(
      await this.submit('POST', this.getApiV1Endpoint() + '/public/api/index.php', {
        data: this.prepareFormData({search, limit: 10}),
      })
    );
    return items;
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
