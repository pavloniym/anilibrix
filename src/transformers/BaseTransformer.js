// Utils
import get from 'lodash/get'
import stripHtml from "string-strip-html";

export default class BaseTransformer {

  /**
   * Method used to transform a fetched collection.
   *
   * @param items The items to be transformed.
   * @returns {Array} The transformed items.
   */
  fetchCollection(items) {
    return (items || []).map(item => this.fetch(item));
  }


  /**
   * Method used to transform a fetched item
   *
   * @param item
   * @returns {*}
   */
  fetchItem(item) {
    return this.fetch(item);
  }

  /**
   * Get item data
   *
   * @param item
   */
  fetch(item) {
    //
  }


  /**
   * Get value from source
   *
   * @param source
   * @param search
   * @param fallback
   * @returns {*}
   */
  get(source, search, fallback = null) {
    return get(source, search, fallback);
  }


  /**
   * Strip html tags
   *
   * @param value
   * @return {*}
   */
  stripHtml(value) {
    return value ? stripHtml(value) : null;
  }
}
