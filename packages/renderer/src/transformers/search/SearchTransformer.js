import stripHtml from 'string-strip-html';
import BaseTransformer from '@/renderer/src/transformers/BaseTransformer';

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
        ru: this._stripHtml(this.get(release, 'names.0')),
        original: this._stripHtml(this.get(release, 'names.1'))
      },
      poster: this.get(release, 'poster')
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
