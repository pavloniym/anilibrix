import stripHtml from "string-strip-html";
import BaseTransformer from "@transformers/BaseTransformer";

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
        ru: this._stripHtml(this.get(release, 'names.ru')),
        original: this._stripHtml(this.get(release, 'names.en'))
      },
      poster: this.get(release, 'poster.url'),
    }
  }

  /**
   * Strip html tags
   *
   * @param value
   * @return {*}
   * @private
   */
  _stripHtml(value) {
    return value ? stripHtml(value) : null;
  }

}
