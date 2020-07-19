// Transformers
import BaseTransformer from "@transformers/BaseTransformer";

// Utils
import stripHtml from 'string-strip-html';

export default class ReleaseTransformer extends BaseTransformer {

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
      code: this.get(release, 'code'),
      names: {
        ru: this._stripHtml(this.get(release, 'names.0')),
        original: this._stripHtml(this.get(release, 'names.1'))
      },
      voices: this.get(release, 'voices') || [],
      genres: this.get(release, 'genres') || [],
      poster: this.get(release, 'poster'),
      datetime: this._getReleaseDatetime(release),
      episodes: {
        playlist: this.get(release, 'playlist'),
        torrents: this.get(release, 'torrents')
      },
      description: this._stripHtml(this.get(release, 'description')),
    }
  }

  /**
   * Get release datetime
   *
   * @param release
   * @return {{system: null, human: string, timestamp: *}}
   */
  _getReleaseDatetime(release) {

    const timestamp = this.get(release, 'last');
    const system = timestamp ? new Date(timestamp * 1000) : null;
    const human = system ? new Intl.DateTimeFormat(undefined, {}).format(system) : null;

    return {timestamp, system, human}
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
