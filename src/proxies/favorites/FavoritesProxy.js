// Proxy
import BaseProxy from "@proxies/BaseProxy";

// Responses
import {handleResponseFromV1Api} from '@utils/requests/handleResponse';


export default class FavoritesProxy extends BaseProxy {

  /**
   * Get favorites
   *
   * @param configuration
   * @return {Promise<*>}
   */
  async getFavorites(configuration = {}) {
    return handleResponseFromV1Api(
      await this.submit('POST', this.getApiV1Endpoint() + '/public/api/index.php', {
        ...configuration,
        data: this.prepareFormData({page: 1, perPage: 15, query: 'favorites'}),
      })
    );
  }


  /**
   * Add release to favorites
   *
   * @param release_id
   * @param configuration
   * @return {Promise<*>}
   */
  async addToFavorites(release_id, configuration = {}) {
    return handleResponseFromV1Api(
      await this.submit('POST', this.getApiV1Endpoint() + '/public/api/index.php', {
        ...configuration,
        data: this.prepareFormData({id: release_id, action: 'add', query: 'favorites'}),
      })
    );
  }


  /**
   * Remove from favorites
   *
   * @param release_id
   * @param configuration
   * @return {Promise<void>}
   */
  async removeFromFavorites(release_id, configuration = {}) {
    return handleResponseFromV1Api(
      await this.submit('POST', this.getApiV1Endpoint() + '/public/api/index.php', {
        ...configuration,
        data: this.prepareFormData({id: release_id, action: 'delete', query: 'favorites'}),
      })
    );
  }


}
