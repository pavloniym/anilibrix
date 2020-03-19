import Transformer from '@transformer'

export default class extends Transformer {

  /**
   * Transform incoming data
   *
   * @returns {{}}
   * @param release
   */
  static anime(release) {
    return {
      id: this.get(release, 'mal_id'),
      title: this.get(release, 'title')
    }
  }



  /**
   * Get episodes
   *
   * @param items
   * @return {{}[]}
   */
  static episodes(items) {
    return (items || []).map(episode => {
      return {
        id: this.get(episode, 'episode_id'),
        title: this.get(episode, 'title'),
        title_japanese: this.get(episode, 'title_japanese')
      }
    });
  }

}
