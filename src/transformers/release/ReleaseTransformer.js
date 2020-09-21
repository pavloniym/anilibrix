// Transformers
import BaseTransformer from "@transformers/BaseTransformer";

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
      names: this._getNames(release),
      genres: this.get(release, 'genres') || [],
      poster: this.get(release, 'poster'),
      datetime: this._getDatetime(release),
      playlist: this.get(release, 'playlist'),
      torrents: this.get(release, 'torrents'),
      description: this.stripHtml(this.get(release, 'description')),
    }
  }

  /**
   * Get release names
   *
   * @param release
   * @return {{ru: *, original: *}}
   * @private
   */
  _getNames(release) {
    return {
      ru: this.stripHtml(this.get(release, 'names[0]')),
      original: this.stripHtml(this.get(release, 'names[1]'))
    }
  }

  /**
   * Get release datetime
   *
   * @param release
   * @return {{system: null, human: string, timestamp: *}}
   */
  _getDatetime(release) {

    const timestamp = this.get(release, 'last');
    const system = timestamp ? new Date(timestamp * 1000) : null;
    const human = system ? new Intl.DateTimeFormat(undefined, {}).format(system) : null;

    return {timestamp, system, human}
  }

}
