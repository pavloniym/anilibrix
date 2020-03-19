import Jikan from 'jikan-node'
import Proxy from '@proxy'
import __get from 'lodash/get'

export default class extends Proxy {
  constructor(parameters = {}) {
    super('https://api.jikan.moe/v3', parameters)
  }


  /**
   * Get anime by name
   *
   * @param name
   * @return {Promise<unknown>}
   */
  getAnimeByName(name) {
    return new Promise((resolve, reject) => {
      new Jikan().search('anime', name, {score: 1})
        .then(response => __get(response, ['results', 0], null))
        .then(release => resolve(release))
        .catch(error => reject(error))
    })
  }


  /**
   * Get episodes for anime with provided id
   *
   * @param id
   * @return {Promise<unknown>}
   */
  getAnimeEpisodes(id) {
    return new Promise((resolve, reject) => {
      new Jikan()
        .findAnime(id, 'episodes')
        .then(response => {
          console.log(response);
          return __get(response, 'episodes', [])
        })
        .then(episodes => resolve(episodes))
        .catch(error => reject(error))
    })
  }


}
