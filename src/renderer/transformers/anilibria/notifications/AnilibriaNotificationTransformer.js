import Transformer from '@transformer'

export default class extends Transformer {

  /**
   * Transform incoming data
   *
   * @param release
   * @returns {{}}
   */
  static fetch(release) {
    return {
      ...release,
      notification: {
        datetime: new Date(),
        isSeen: false,
        isNotified: false
      }
    }
  }
}
