import BaseTransformer from "@transformers/BaseTransformer";

export default class NotificationTransformer extends BaseTransformer {

  /**
   * Transform incoming data
   *
   * @param release
   * @returns {{}}
   */
  fetch(release) {
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
