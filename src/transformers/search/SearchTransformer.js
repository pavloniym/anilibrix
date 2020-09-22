import BaseTransformer from "@transformers/BaseTransformer";

export default class SearchTransformer extends BaseTransformer {


  /**
   * Fetch search data
   *
   * @param release
   * @return {*}
   */
  fetch(release) {
    return {
      id: this.get(release, 'id'),
      names: {
        ru: this.stripHtml(this.get(release, 'names[0]')),
        original: this.stripHtml(this.get(release, 'names[1]'))
      },
      poster: this.get(release, 'poster'),
    }
  }

}
