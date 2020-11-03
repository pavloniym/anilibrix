// Proxy
import BaseProxy from "@proxies/BaseProxy";

// Utils
import {handleResponseFromV1Api} from "@utils/requests/handleResponse";

export default class SearchProxy extends BaseProxy {

  /**
   * Search releases by name
   *
   * @param search
   * @param configuration
   * @return {Promise}
   */
  async searchReleases(search, configuration = {}) {
    return handleResponseFromV1Api(
      await this.submit('POST', this.getApiV1Endpoint() + '/public/api/index.php', {
        data: this.prepareFormData({search, query: 'search', limit: 10}),
      })
    );
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
