// Proxy
import BaseProxy from "@proxies/BaseProxy";

// Utils
import qs from 'qs';
import {handleResponseFromV1Api} from '@utils/requests/handleResponse';


export default class FavoritesProxy extends BaseProxy {

  /**
   * Get favorites
   *
   * @param parameters
   * @return {Promise<*>}
   */
  async getFavorites(parameters = {}) {
    return handleResponseFromV1Api(
      await this.submit('POST', this.getApiV1Endpoint() + '/public/api/index.php', {
        ...parameters,
        data: qs.stringify({page: 1, perPage: 15, query: 'favorites'}),
        headers: this.getRequestHeaders(),
      })
    );
  }


  /**
   * Add release to favorites
   *
   * @param release_id
   * @param parameters
   * @return {Promise<*>}
   */
  async addToFavorites(release_id, parameters = {}) {

    const data = this.getFormDataObject({id: release_id, action: 'add', query: 'favorites'});
    const params = {data, ...parameters};
    const response = await this.submit('POST', this.getApiEndpoint() + '/public/api/index.php', params);

    return this.handleResponse(response.data);
  }


  /**
   * Remove from favorites
   *
   * @param release_id
   * @param parameters
   * @return {Promise<void>}
   */
  async removeFromFavorites(release_id, parameters = {}) {

    const data = this.getFormDataObject({id: release_id, action: 'delete', query: 'favorites'});
    const params = {data, ...parameters};
    const response = await this.submit('POST', this.getApiEndpoint() + '/public/api/index.php', params);

    return this.handleResponse(response.data);
  }


}
