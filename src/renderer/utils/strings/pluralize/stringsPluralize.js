/**
 * Plural forms for russian words
 *
 * @param  {Number} count quantity for word
 * @param  {Array} words Array of words. Example: ['депутат', 'депутата', 'депутатов'], ['коментарий', 'коментария', 'комментариев']
 * @return {String}        Count + plural form for word
 * @see https://gist.github.com/znechai/1b25d0ee9a92e5b879175ab4f040dbbc
 */
export default (count, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return count + ' ' + words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
}
