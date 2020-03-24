import Transformer from '@transformer'

export default class extends Transformer {

  /**
   * Transform incoming data
   *
   * @returns {{}}
   * @param anime
   */
  static fetch(anime) {
    return {
      id: this.get(anime, 'mal_id'),
      title: this.get(anime, 'title')
    }
  }

}
