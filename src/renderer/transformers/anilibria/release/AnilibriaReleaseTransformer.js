import Transformer from '@transformer'
import AnilibriaProxy from '@proxies/anilibria'

import store from '@store'
import stripHtml from 'string-strip-html';
import __camelCase from 'lodash/camelCase'

import {TorrentWindow} from '@/main/windows'
import {ipcMain as ipc} from 'electron'

export default class extends Transformer {

  /**
   * Method used to transform a fetched collection.
   *
   * @param items The items to be transformed.
   * @returns Promise The transformed items.
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
    return {
      id: this.get(release, 'id'),
      year: this.get(release, 'year'),
      type: this.get(release, 'type'),
      names: {
        ru: stripHtml(this.get(release, 'names.0')),
        original: stripHtml(this.get(release, 'names.1'))
      },
      voices: this.get(release, 'voices') || [],
      genres: this.get(release, 'genres') || [],
      poster: {
        path: this.get(release, 'poster'),
        image: null,
      },
      datetime: this.getReleaseDatetime(release),
      episodes: await this.getReleaseEpisodes(release),
      description: stripHtml(this.get(release, 'description')),
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
      timestamp,
      system,
      human
    }
  }

  /**
   * Get release episodes
   *
   * @param release
   * @return Promise
   */
  static getReleaseEpisodes(release) {
    return new Promise(async (resolve, reject) => {

      const episodes = {};
      const playlist = this.get(release, 'playlist') || [];
      const torrents = await this._getTorrents(release) || [];

      // Parse playlist
      this._parsePlaylist(playlist, episodes);

      // Parse torrents
      this._parseTorrents(torrents, episodes);

      // Filter all sources without payload
      // Reverse to descending order
      const items = Object
        .values(episodes)
        .map(episode => ({...episode, sources: episode.sources.filter(source => source.payload !== null)}))
        .reverse();

      // Resolve episodes
      resolve(items);
    });
  }

  /**
   * Create episode entity
   *
   * @param number
   * @param episodes
   */
  static _createEpisode(number, episodes) {
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
  static _createSource(type, label, alias, payload) {
    return {
      type,
      label,
      alias,
      payload
    }
  };

  /**
   * Get torrents data
   *
   * @param release
   * @return {Promise<unknown>}
   * @private
   */
  static _getTorrents(release) {
    if (this.get(store, 'state.app.settings.player.torrents.process') === true) {

      return new Promise((resolve, reject) => {

        const requests = [];
        const torrents = [];

        (this.get(release, 'torrents') || [])
          .filter(torrent => new RegExp('HEVC').test(torrent.quality) === false)
          .forEach(torrent => {
            requests.push(
              new Promise((resolve, reject) => {

                const torrentUrl = torrent.url;
                const torrentId = torrent.id;

                // Get blob torrent file from server
                // Send to torrent for parsing data
                new AnilibriaProxy()
                  .getTorrentFile(torrentUrl)
                  .then(blob => TorrentWindow.send('torrent:get', {
                    torrentId,
                    blob
                  }));

                // Listen event with torrent data to main process
                // Resolve when event is caught
                ipc.on(`torrent:data:${torrentId}`, (e, {data}) => {
                  torrents.push({
                    torrent,
                    data
                  });
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

  /**
   * Parse playlist
   *
   * @param playlist
   * @param episodes
   * @private
   */
  static _parsePlaylist(playlist, episodes) {

    // Parse server playlists
    playlist.forEach(item => {

      // Get episode number
      // It is same as id in anilibria API
      const episode = this.get(item, 'id');

      // Create episode if it not exists
      this._createEpisode(episode, episodes);

      // Set episode data
      episodes[episode].id = episode;
      episodes[episode].title = this.get(item, 'title');
      episodes[episode].sources.push(this._createSource('server', '1080', 'fhd', this.get(item, 'fullhd')));
      episodes[episode].sources.push(this._createSource('server', '720', 'hd', this.get(item, 'hd')));
      episodes[episode].sources.push(this._createSource('server', '480', 'sd', this.get(item, 'sd')));

    });
  }

  /**
   * Parse torrents
   *
   * @param torrents
   * @param episodes
   * @private
   */
  static _parseTorrents(torrents, episodes) {
    torrents.forEach(item => {

      const type = 'torrent';
      const label = this.get(item, 'torrent.quality') || null;
      const alias = label ? __camelCase(label) : null;
      const files = this.get(item, 'data.files') || [];

      files.forEach((file, k) => {

        // Parse episode from torrent filename
        let episode = this._parseEpisodeFromTorrentFilename(this.get(file, 'name'));

        if (episode !== null || files.length === 1) {

          // If there is only one file in torrent
          // And if can't parse episode number -> make it as first (1) episode
          // This is a little bit hack
          if (files.length === 1) episode = 1;

          // Create episode if it not exists
          this._createEpisode(episode, episodes);

          // Set episode data
          episodes[episode].id = episode;
          episodes[episode].title = episodes[episode].title || `Серия ${episode}`;
          episodes[episode].sources.push(
            this._createSource(
              type, label, alias,
              {
                index: k,
                torrent: {
                  id: this.get(item, 'torrent.id')
                },
                file: {
                  name: this.get(file, 'name'),
                  path: this.get(file, 'path')
                }
              }
            )
          );
        }
      })
    });
  }

  /**
   * Parse episode from torrent filename
   *
   * @param filename
   * @return {null|*}
   * @private
   */
  static _parseEpisodeFromTorrentFilename(filename) {
    if (filename && typeof filename === 'string') {
      const episode = this.get(filename.match(/_\[(\d+)\]_/), [1]) || null;

      return episode !== null
        ? parseInt(episode, 10)
        : null;
    }

    return null;
  }

}
