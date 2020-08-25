import BaseProxy from "@proxies/BaseProxy";

export default class CatalogProxy extends BaseProxy {


  /**
   * Get catalog genres
   *
   * @return {Promise<*>}
   */
  async getCatalogGenres() {
    const response = await this.submit('GET', this.getApiEndpoint() + '/getGenres');
    return response.data || [];
  }


  /**
   * Get catalog years
   *
   * @return {Promise<*>}
   */
  async getCatalogYears() {
    const response = await this.submit('GET', this.getApiEndpoint() + '/getYears');
    return response.data || [];
  }


  /**
   * Get catalog data
   *
   * @param genres
   * @param years
   * @param page
   * @param perPage
   * @param sort
   * @param parameters
   * @return {Promise<*>}
   */
  async getCatalogReleases({genres = [], years = [], page = 1, perPage = 15, sort = 1}, parameters = {}) {

    const data = this.getFormDataObject({
      sort, page, perPage,
      query: 'catalog', xpage: 'catalog', search: {year: (years || []).join(','), genre: (genres || []).join(',')}
    });

    const params = {data, ...parameters};
    const response = await this.submit('POST', this.getApiEndpoint() + '/public/api/index.php', params);

    return this.handleResponse(response.data);

  }


}
