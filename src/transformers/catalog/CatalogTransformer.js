// Proxy + Transformers
import ReleaseProxy from "@proxies/release/ReleaseProxy";
import BaseTransformer from "@transformers/BaseTransformer";

// Utils
import stripHtml from 'string-strip-html';

export default class CatalogTransformer extends BaseTransformer {

  /**
   * Transform incoming data
   *
   * @param release
   * @returns {{}}
   */
  fetch(release) {
    return {
      id: this.get(release, 'id'),
      year: this.get(release, 'year'),
      type: this.get(release, 'type'),
      names: {
        ru: this._stripHtml(this.get(release, 'names.0')),
        original: this._stripHtml(this.get(release, 'names.1'))
      },
      poster: this._getPoster(release),
      genres: this.get(release, 'genres') || [],
      description: this._stripHtml(this.get(release, 'description')),
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


  /**
   * Get poster image path
   *
   * @param release
   * @return {string}
   * @private
   */
  _getPoster(release) {
    return new ReleaseProxy().getReleasePosterPath(this.get(release, 'poster'));
  }
}
