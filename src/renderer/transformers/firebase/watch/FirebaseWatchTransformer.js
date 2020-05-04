import Transformer from "@transformer";

export default class extends Transformer {


  /**
   * Transform incoming data
   *
   * @returns {{}}
   * @param watch
   */
  static fetch(watch) {

    const datetime = this.get(watch, 'datetime');

    return {
      _id: this.get(watch, '_id'),
      time: this.get(watch, 'time'),
      isSeen: this.get(watch, 'isSeen') || false,
      quality: this.get(watch, 'quality'),
      datetime: datetime ? new Date(datetime) : null,
      releaseId: this.get(watch, 'releaseId'),
      episodeId: this.get(watch, 'episodeId'),
      percentage: this.get(watch, 'percentage'),
    }
  }

}
