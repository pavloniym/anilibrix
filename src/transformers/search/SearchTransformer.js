// Transformers
import BaseTransformer from "@transformers/BaseTransformer";

// Proxy
import SearchProxy from "@proxies/search";

export default class SearchTransformer extends BaseTransformer {


  /**
   * Fetch search data
   *
   * @param release
   * @return {*}
   */
  fetch(release) {
    return {
      id: this.get(release, 'id'),
      names: {
        ru: this.stripHtml(this.get(release, 'names[0]')),
        original: this.stripHtml(this.get(release, 'names[1]'))
      },
      poster: this._getPoster(release),
    }
  }



  /**
   * Get poster image path
   *
   * @param release
   * @return {string}
   * @private
   */
  _getPoster(release) {
    return new SearchProxy().getReleasePosterPath(this.get(release, 'poster'));
  }

}
