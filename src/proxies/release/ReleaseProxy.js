// Proxy
import BaseProxy from "@proxies/BaseProxy";

// Utils
import {handleResponseFromV2Api} from "@utils/requests/handleResponse";


export default class ReleaseProxy extends BaseProxy {


  /**
   * Get last releases
   *
   * @return {Promise}
   */
  async getReleases(configuration = {}) {

    // Create params object
    const params = {
      limit: 14,
      playlist_type: 'array',
      description_type: 'no_view_order'
    };

    // Create request
    // Get response data
    return handleResponseFromV2Api(
      await this.submit('GET', this.getApiEndpoint() + '/getUpdates', {params, ...configuration})
    );
  }


  /**
   * Get release with provided id
   *
   * @param release_id
   * @param configuration
   * @return {Promise}
   */
  async getRelease(release_id, configuration = {}) {

    // Create params object
    const params = {
      id: release_id,
      playlist_type: 'array',
      description_type: 'no_view_order'
    };

    // Create request
    // Get response data
    return handleResponseFromV2Api(
      await this.submit('GET', this.getApiEndpoint() + '/getTitle', {params, ...configuration})
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

    // Create params object
    const params = {search, limit: 10};

    // Create request
    // Get response data
    return handleResponseFromV2Api(
      await this.submit('GET', this.getApiEndpoint() + '/searchTitles', {params, ...configuration})
    );
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
