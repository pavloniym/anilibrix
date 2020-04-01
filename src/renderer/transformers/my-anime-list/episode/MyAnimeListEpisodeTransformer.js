import Transformer from '@transformer'

export default class extends Transformer {

  /**
   * Transform incoming data
   *
   * @returns {{}}
   * @param episode
   */
  static fetch(episode) {
    return {
      id: this.get(episode, 'episode_id'),
      title: this.get(episode, 'title'),
      title_japanese: this.get(episode, 'title_japanese'),
      filler: this.get(episode, 'filler'),
      recap: this.get(episode, 'recap'),
      aired: this.get(episode, 'aired')
        ? new Date(this.get(episode, 'aired'))
        : null,
    }
  }

}
