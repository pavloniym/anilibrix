import Transformer from '@transformer'

export default class extends Transformer {
  /**
   * Transform incoming data
   *
   * @param i
   * @returns {{}}
   */
  static fetch(i) {
    return {
      id: this.get(i, 'id'),
      code: this.get(i, 'code'),
      names: {
        ru: this.get(i, 'names.0'),
        original: this.get(i, 'names.1')
      },
      series: this.get('series'),
      moon: this.get(i, 'moon'),
      poster: this.get(i, 'poster'),
      last: this.get(i, 'last'),
      genres: this.get(i, 'genres', []),
      player: {
        stream: {
          sd: this.get(i, 'playlist.0.sd'),
          hd: this.get(i, 'playlist.0.hd'),
          fhd: this.get(i, 'playlist.0.fullhd')
        }
      }
    }
  }
}
