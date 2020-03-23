import Transformer from '@transformer'
import AnilibriaProxy from '@proxies/anilibria'
import stripHtml from "string-strip-html";

import {TorrentWindow} from '@/main/windows'

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
      datetime: this.getReleaseDatetime(release),
      names: {
        ru: stripHtml(this.get(release, 'names.0')),
        original: stripHtml(this.get(release, 'names.1'))
      },
      description: stripHtml(this.get(release, 'description')),
      poster: this.get(release, 'poster'),
      genres: this.get(release, 'genres', []),
      year: this.get(release, 'year'),
      type: this.get(release, 'type'),
      voices: this.get(release, 'voices'),
      episodes: episodes,
      episode: episodes[0] || null,
    }
  }


  /**
   * Get release episodes
   *
   * @param release
   * @return array
   */
  static getReleaseEpisodes(release) {
    return new Promise(async (resolve, reject) => {

      TorrentWindow.send('torrent:get', {});

      const episodes = {};
      const torrents = await this._getTorrents(release);

      resolve();
    });


    /*return (this.get(release, 'playlist') || [])
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
         fhd: null,
         fhd_hevc: null,
       }
     }
   })*/
  }


  /**
   * Get release datetime
   *
   * @param release
   * @return {{system: null, human: string, timestamp: *}}
   */
  static getReleaseDatetime(release) {

    const timestamp = this.get(release, 'last');
    const system = timestamp ? new Date(timestamp * 1000) : null;
    const human = system ? new Intl.DateTimeFormat(undefined, {}).format(system) : null;

    return {
      timestamp, system, human
    }
  }


  /**
   * Get torrents data
   *
   * @param release
   * @return {Promise<unknown>}
   * @private
   */
  static _getTorrents(release) {
    return new Promise((resolve, reject) => {

      const requests = [];
      const torrents = [];

      (this.get(release, 'torrents') || [])
        .forEach(torrent => {
          requests.push(
            new Promise((resolve, reject) => {

              const torrentUrl = torrent.url;
              const torrentId = torrent.id;

              new AnilibriaProxy()
                .getTorrentFile(torrentUrl)
                .then(torrentBuffer => TorrentWindow.send('torrent:get', {torrentBuffer, torrentId}))

              /*ipc.on(`main:torrent:meta:${torrentId}`, (e, payload) => {
                resolve();
                torrents.push({torrent, payload})
              });*/
            })
          )
        });

      Promise.all(requests)
        .then(() => resolve(torrents))
        .catch(error => reject(error))
    })
  }
}
