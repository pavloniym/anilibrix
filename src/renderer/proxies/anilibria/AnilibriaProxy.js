import Proxy from '@proxy'
import store from "@store";
import __get from "lodash/get";
import cookieParser from 'set-cookie-parser'

export default class AnilibriaProxy extends Proxy {

  /**
   * @param parameters
   */
  constructor(parameters = {}) {
    super('/public/api/index.php', parameters)
  }


  /**
   * Login
   *
   * @param login
   * @param password
   * @return {Promise<*>}
   */
  async login({login, password}) {

    const data = this._getFormDataObject({mail: login, passwd: password});
    const params = {data, headers: data.getHeaders()};
    const response = await this.submit('POST', this._getHost() + '/public/login.php', params);

    // Get status
    // If err === 'ok' -> authorization is success
    const status = __get(response, 'data.err') === 'ok';
    if (status) {

      // Parse header cookies
      const header_cookies = __get(response, 'headers.set-cookie', null);
      const cookies = cookieParser(header_cookies, {map: true});
      const session = __get(cookies, 'PHPSESSID.value', null);

      // Get session
      // If session is not defined -> throw error
      if (session && session.length > 0) {
        return session
      } else {
        throw new Error('Сессия не определена');
      }

    } else {
      throw new Error(__get(response, 'data.mes', 'Ошибка сервера'));
    }
  }


  /**
   * Logout
   *
   * @return {Promise<*>}
   */
  async logout() {
    return await this.submit('POST', this._getHost() + '/public/logout.php');
  }


  /**
   * Get profile
   *
   * @return {Promise<*>}
   */
  async getProfile() {

    const data = this._getFormDataObject({query: 'user'});
    const params = {data, headers: data.getHeaders()};
    const response = await this.submit('POST', this._getHost() + this.endpoint, params);

    console.log(response);


    return this._parseResponse(response.data);
  }


  /**
   * Get last 14 releases
   *
   * @return {Promise}
   */
  async getReleases(parameters) {

    const data = this._getFormDataObject({query: 'list', perPage: 14});
    const params = {data, headers: data.getHeaders(), ...parameters};
    const response = await this.submit('POST', this._getHost() + this.endpoint, params);

    return this._parseResponse(response.data);
  }


  /**
   * Get release with provided id
   *
   * @param releaseId
   * @param parameters
   * @return {Promise<unknown>}
   */
  async getRelease(releaseId, parameters = {}) {

    const data = this._getFormDataObject({query: 'release', id: releaseId});
    const params = {data, headers: data.getHeaders(), ...parameters};
    const response = await this.submit('POST', this._getHost() + this.endpoint, params);

    return this._parseResponse(response.data);
  }


  /**
   * Get poster image
   *
   * @param src
   * @return {string}
   */
  async getImage({src}) {
    if (src) {
      const response = await this.submit('GET', this._getHost() + src, {responseType: 'arraybuffer'});
      const image = response ? Buffer.from(response.data, 'binary').toString('base64') : null;
      return image ? `data:image/jpeg;base64,${image}` : null;
    }
    return null;
  }


  /**
   * Get torrent file
   *
   * @param torrentUrl
   * @return {Promise<unknown>}
   */
  async getTorrent({url}) {
    if (url) {
      return await this.submit('GET', this._getHost() + url, {responseType: 'arraybuffer'});
    }
  }


  /**
   * Search releases by name
   *
   * @param searchQuery
   * @param parameters
   * @return {Promise<unknown>}
   */
  async searchReleases(searchQuery, parameters) {

    const data = this._getFormDataObject({query: 'search', search: searchQuery});
    const params = {data, headers: data.getHeaders(), ...parameters};
    const response = await this.submit('POST', this._getHost() + this.endpoint, params);

    return this._parseResponse(response.data);
  }


  /**
   * Get catalog genres
   *
   * @return {Promise<*>}
   */
  async getCatalogGenres() {
    const data = this._getFormDataObject({query: 'genres'});
    const response = await this.submit('POST', this._getHost() + this.endpoint, {data, headers: data.getHeaders()});

    return this._parseResponse(response.data);
  }


  /**
   * Get catalog years
   *
   * @return {Promise<*>}
   */
  async getCatalogYears() {
    const data = this._getFormDataObject({query: 'years'});
    const response = await this.submit('POST', this._getHost() + this.endpoint, {data, headers: data.getHeaders()});

    return this._parseResponse(response.data);
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
  async getCatalogItems({genres = [], years = [], page = 1, perPage = 15, sort = 1}, parameters = {}) {

    const data = this._getFormDataObject({
      sort, page, perPage,
      query: 'catalog', xpage: 'catalog', search: {year: (years || []).join(','), genre: (genres || []).join(',')}
    });

    const params = {data, headers: data.getHeaders(), ...parameters};
    const response = await this.submit('POST', this._getHost() + this.endpoint, params);

    return this._parseResponse(response.data);

  }

  /**
   * Get anilibria host
   *
   * @return {*}
   */
  _getHost() {
    return __get(store, 'state.app.settings.connection.host', null);
  }


  /**
   * Get pac proxy usage
   *
   * @return {boolean}
   * @private
   */
  _getProxyPacUsage() {
    return __get(store, 'state.app.settings.connection.proxy.type') === 'pac';
  }


  /**
   * Get custom proxy usage
   *
   * @return {boolean}
   * @private
   */
  _getProxyCustomUsage() {
    return __get(store, 'state.app.settings.connection.proxy.type') === 'custom';
  }


  /**
   * Get pac proxy configuration
   *
   * @return {{port: *, host: *, direct: *, source: *}}
   * @private
   */
  _getProxyPacConfiguration() {
    const proxy = __get(store, 'state.app.settings.connection.proxy.pac');
    return {
      host: __get(proxy, 'host'),
      port: __get(proxy, 'port'),
      direct: __get(proxy, 'direct'),
      source: __get(proxy, 'source')
    }
  }


  /**
   * Get custom proxy configuration
   *
   * @return {{port: *, host: *}}
   * @private
   */
  _getProxyCustomConfiguration() {
    const proxy = __get(store, 'state.app.settings.connection.proxy.custom');
    return {
      host: __get(proxy, 'host'),
      port: __get(proxy, 'port'),
    }
  }

  /**
   * Set proxy pac configuration
   *
   * @param host
   * @param port
   * @param direct
   * @return {*}
   * @private
   */
  _setProxyPacConfiguration({host = null, port = null, direct = false} = {}) {
    return store.dispatch('app/settings/connection/setProxyPacConnection', {host, port, direct});
  }


  /**
   * Clear pac proxy connection
   *
   * @return {Promise<any>}
   * @private
   */
  _clearProxyPacConnection() {
    return store.dispatch('app/settings/connection/clearProxyPacConnection');
  }


  /**
   * Parse base response model
   *
   * @param response
   * @return {*}
   */
  _parseResponse(response) {

    const data = __get(response, 'data', null);
    const status = __get(response, 'status', false);
    const message = __get(response, 'error.message', 'Ошибка при запросе');

    if (status === true) {
      return data;

    } else {
      throw new Error(message);
    }
  }

};
