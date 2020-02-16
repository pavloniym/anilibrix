/* ============
 * Transformer
 * ============
 *
 * The base transformer.
 *
 * Transformers are used to transform the fetched data
 * to a more suitable format.
 * For instance, when the fetched data contains snake_cased values,
 * they will be camelCased.
 */

import get from 'lodash/get'

export default class Transformer {
  /**
   * Method used to transform a fetched collection.
   *
   * @param items The items to be transformed.
   * @param modules Additional modules that should be added to transformed item
   * @param fetcher
   * @returns {Array} The transformed items.
   */
  static fetchCollection(items, modules = [], fetcher = 'fetchItem') {
    return (items || []).map(item => this[fetcher](item, modules));
  }

  /**
   * Method used to transform a fetched item
   *
   * @param item
   * @param modules
   * @param fetcher
   * @returns {*}
   */
  static fetchItem(item, modules = [], fetcher = 'fetch') {
    const data = this[fetcher](item);

    // Inject modules
    if (modules && modules instanceof Array) {
      modules.forEach(m => {
        if (typeof this[m] === 'function') data[m] = this[m](item, data);
      });
    }

    return data;
  }

  /**
   * Method used to transform a collection to be send.
   *
   * @param items The items to be transformed.
   * @param modules Additional modules that should be added to transformed item
   * @returns {Array} The transformed items.
   */
  static sendCollection(items, modules = []) {
    return items.map(item => this.sendItem(item, modules));
  }

  /**
   * Method used to transform an item to be send.
   *
   * @param item
   * @param modules
   * @returns {*}
   */
  static sendItem(item, modules = []) {
    const data = this.send(item);

    // Inject modules
    if (modules && modules instanceof Array) {
      modules.forEach(m => {
        if (typeof this[m] === 'function') data[m] = this[m](item, data);
      });
    }

    return data;
  }

  /**
   * Get value from source
   *
   * @param source
   * @param search
   * @param fallback
   * @returns {*}
   */
  static get(source, search, fallback = null) {
    return get(source, search, fallback);
  }
}
