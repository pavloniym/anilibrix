import stripHtml from 'string-strip-html';
import Transformer from '@transformer'

export default class AnilibriaCatalogTransformer extends Transformer {

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
      voices: this.get(release, 'voices') || [],
      genres: this.get(release, 'genres') || [],
      poster: {
        path: this.get(release, 'poster'),
        image: null,
      },
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
}
