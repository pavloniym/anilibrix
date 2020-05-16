import Proxy from '@proxy'
import store from "@store";
import __get from "lodash/get";

export default class Anilibria extends Proxy {

  /**
   * @param parameters
   */
  constructor(parameters = {}) {
    super('/public/api/index.php', parameters)
  }


  /**
   * Get last 14 releases
   *
   * @return {Promise}
   */
  async getReleases(parameters) {

    const data = this._getFormDataObject({query: 'list', perPage: 14});
    const response = await this.submit(
      'POST',
      this._getHost() + this.endpoint,
      {
        data,
        headers: data.getHeaders(),
        ...parameters
      }
    );

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
    const response = await this.submit(
      'POST',
      this._getHost() + this.endpoint,
      {...parameters, data, headers: data.getHeaders()}
    );

    return this._parseResponse(response.data);
  }


  /**
   * Get poster image
   *
   * @param src
   * @return {string}
   */
  async getPoster({src}) {
    if (src) {
      const response = await this.submit('GET', this._getHost() + src, {responseType: 'arraybuffer'});
      return Buffer.from(response.data, 'binary').toString('base64');
    }
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
    const response = await this.submit(
      'POST',
      this._getHost() + this.endpoint,
      {
        data,
        headers: data.getHeaders(),
        ...parameters,
      }
    );

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
