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
      year: this.get(release, 'season.year'),
      type: this.get(release, 'type.full_string'),
      code: this.get(release, 'code'),
      names: {
        ru: this._stripHtml(this.get(release, 'names.ru')),
        original: this._stripHtml(this.get(release, 'names.en'))
      },
      genres: this.get(release, 'genres') || [],
      poster: this.get(release, 'poster.url'),
      datetime: this._getReleaseDatetime(release),
      episodes: {
        hosts: this.get(release, 'player.hosts'),
        playlist: this.get(release, 'player.playlist'),
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

    const timestamp = this.get(release, 'updated');
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
