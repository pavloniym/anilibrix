import Transformer from '@transformer'
import objectHash from 'object-hash'
import stripHtml from "string-strip-html";

export default class extends Transformer {
  /**
   * Transform incoming data
   *
   * @param release
   * @returns {{}}
   */
  static fetch(release) {
    const episodes = this.getReleaseEpisodes(release);
    return {
      id: this.get(release, 'id'),
      hash: this.createReleaseHash(release),
      names: {
        ru: stripHtml(this.get(release, 'names.0')),
        original: stripHtml(this.get(release, 'names.1'))
      },
      description: stripHtml(this.get(release, 'description')),
      poster: this.get(release, 'poster'),
      genres: this.get(release, 'genres', []),
      year: this.get(release, 'year'),
      episodes: episodes,
      episode: episodes[0] || null,
    }
  }


  /**
   * Create release hash
   * Use it's id and relative episodes
   *
   * @param release
   * @return string
   */
  static createReleaseHash(release) {
    return objectHash({
      id: this.get(release, 'id'),
      episodes: this.getReleaseEpisodes(release),
    })
  }


  /**
   * Get release episodes
   *
   * @param release
   * @return array
   */
  static getReleaseEpisodes(release) {
    return (this.get(release, 'playlist') || [])
      .map(episode => {
        return {
          id: this.get(episode, 'id'),
          title: this.get(episode, 'title'),
          stream: {
            sd: this.get(episode, 'sd'),
            hd: this.get(episode, 'hd'),
            fhd: this.get(episode, 'fullhd')
          },
          torrents: {
            _1080p: null,
            _1080p_HEVC: null,
          }
        }
      })

  }
}
