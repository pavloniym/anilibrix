// Proxy
import BaseProxy from "@proxies/BaseProxy";

// Responses
import {handleResponseFromV1Api} from "@utils/requests/handleResponse";


export default class CatalogProxy extends BaseProxy {


  /**
   * Get catalog genres
   *
   * @return {Promise<*>}
   */
  async getCatalogGenres() {
    return handleResponseFromV1Api(
      await this.submit('POST', this.getApiV1Endpoint() + '/public/api/index.php', {
        data: this.prepareFormData({query: 'genres'}),
      })
    );
  }


  /**
   * Get catalog years
   *
   * @return {Promise<*>}
   */
  async getCatalogYears() {
    return handleResponseFromV1Api(
      await this.submit('POST', this.getApiV1Endpoint() + '/public/api/index.php', {
        data: this.prepareFormData({query: 'years'}),
      })
    );
  }


  /**
   * Get catalog data
   *
   * @param genres
   * @param years
   * @param page
   * @param perPage
   * @param sort
   * @param configuration
   * @param parameters
   * @return {Promise<*>}
   */
  async getCatalogReleases({genres = [], years = [], page = 1, perPage = 15, sort = 1}, configuration = {}) {
    return handleResponseFromV1Api(
      await this.submit('POST', this.getApiV1Endpoint() + '/public/api/index.php', {
        ...configuration,
        data: this.prepareFormData({
          sort,
          page,
          perPage,
          query: 'catalog',
          xpage: 'catalog',
          search: {year: (years || []).join(','), genre: (genres || []).join(',')}
        })
      })
    );
  }


}
