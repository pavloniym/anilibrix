import Transformer from '@transformer'
import AnilibriaProxy from '@proxies/anilibria'
import stripHtml from "string-strip-html";

import {TorrentWindow} from '@/main/windows'
import {ipcMain as ipc} from 'electron'

export default class extends Transformer {


  /**
   * Method used to transform a fetched collection.
   *
   * @param items The items to be transformed.
   * @returns {Array} The transformed items.
   */
  static fetchCollection(items) {
    return new Promise((resolve, reject) => {

      const requests = [];
      const data = [];

      (items || [])
        .forEach(item => requests.push(
          new Promise(async resolve => {
            data.push(await this.fetchItem(item));
            resolve();
          })
        ));

      Promise
        .all(requests)
        .then(() => resolve(data))
        .catch(error => reject(error))
    });
  }


  /**
   * Method used to transform a fetched item
   *
   * @param item
   * @returns {*}
   */
  static async fetchItem(item) {
    return this.fetch(item);
  }


  /**
   * Transform incoming data
   *
   * @param release
   * @returns {{}}
   */
  static async fetch(release) {

    // Get episodes
    // Parse server playlists + parse torrents
    const episodes = await this.getReleaseEpisodes(release);

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
   * Get release episodes
   *
   * @param release
   * @return array
   */
  static getReleaseEpisodes(release) {
    return new Promise(async (resolve, reject) => {

      const episodes = {};
      const playlist = this.get(release, 'playlist') || [];
      // const torrents = await this._getTorrents(release);


      /**
       * Create episode entity
       *
       * @param number
       */
      const createEpisode = (number) => {
        if (episodes.hasOwnProperty(number) === false) {
          episodes[number] = {
            id: null,
            title: null,
            sources: [],
          }
        }
      };


      /**
       * Create episode source
       *
       * @param type
       * @param label
       * @param alias
       * @param payload
       * @return {{payload: *, alias: *, label: *, type: *}}
       */
      const createSource = (type, label, alias, payload) => {
        return {
          type,
          label,
          alias,
          payload
        }
      };


      // Parse stream quality episodes
      playlist.forEach(episode => {

        // Get episode number
        // It is same as id in anilibria API
        const number = this.get(episode, 'id');

        // Create episode if it not exists
        createEpisode(number);

        // Set episode data
        episodes[number].id = number;
        episodes[number].title = this.get(episode, 'title');
        episodes[number].sources.push(createSource('server', '1080', 'fhd', this.get(episode, 'fullhd')));
        episodes[number].sources.push(createSource('server', '720', 'hd', this.get(episode, 'hd')));
        episodes[number].sources.push(createSource('server', '480', 'sd', this.get(episode, 'sd')));

      });


      // Resolve episodes
      // Filter all sources without payload
      // Reverse to descending order
      resolve(
        Object
          .values(episodes)
          .map(episode => {
            return {...episode, sources: episode.sources.filter(source => source.payload !== null),}
          })
          .reverse()
      );
    });
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

              const url = torrent.url;
              const id = torrent.id;

              // Get blob torrent file from server
              // Send to torrent for parsing data
              new AnilibriaProxy()
                .getTorrentFile(url)
                .then(blob => TorrentWindow.send('torrent:get', {id, blob}));

              // Listen event with torrent data to main process
              // Resolve when event is caught
              ipc.on(`main:torrent:data:${id}`, (e, data) => {
                torrents.push({torrent, data});
                resolve();
              });
            })
          )
        });

      Promise.all(requests)
        .then(() => resolve(torrents))
        .catch(error => reject(error))
    })
  }
}
