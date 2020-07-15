import store from '@store'
import __camelCase from 'lodash/camelCase'

import Transformer from "@transformers/Transformer";
import AnilibriaProxy from '@proxies/anilibria'
import {ipcMain as ipc} from 'electron'
import {Torrent} from '@main/utils/windows'

export default class extends Transformer {

  constructor({cancelToken = null} = {}) {
    super();
    this.cancelToken = cancelToken;
  }


  /**
   * Transform incoming data
   *
   * @param release
   * @returns Promise
   */
  async fetch(release) {
    try {

      // Get playlist for release
      const playlist = this.get(release, 'playlist') || [];
      const episodes = {};

      // Parse playlist
      // Parse upscale
      // Parse torrents
      this._parsePlaylist(playlist, episodes);
      this._parseUpscale(playlist, episodes);
      this._parseTorrents(await this._getTorrents(release) || [], episodes);

      // Filter all sources without payload
      // Reverse to descending order
      return Object
        .values(episodes)
        .map(episode => ({...episode, sources: episode.sources.filter(source => source.payload !== null)}))
        .filter(episode => episode.sources && episode.sources.length > 0)
        .reverse();

    } catch (error) {
      throw error;
    }
  }


  /**
   * Create episode entity
   *
   * @param number
   * @param episodes
   */
  _createEpisode(number, episodes) {
    if (episodes.hasOwnProperty(number) === false) {
      episodes[number] = {id: null, title: null, sources: []}
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
  _createSource(type, label, alias, payload) {
    return {type, label, alias, payload}
  };

  /**
   * Parse playlist
   *
   * @param playlist
   * @param episodes
   * @private
   */
  _parsePlaylist(playlist, episodes) {

    // Parse server playlists
    playlist.forEach(item => {

      // Get episode number
      // It is same as id in anilibria API
      const episode = this.get(item, 'id');

      // Create episode if it not exists
      this._createEpisode(episode, episodes);

      /**
       * Get payload
       *
       * @param playlistKey
       * @param fileKey
       * @return {{file: *, playlist: *}}
       */
      const getPayload = (playlistKey = null, fileKey = null) => {
        return {
          file: this.get(item, fileKey) || null,
          playlist: this.get(item, playlistKey) || null,
        }
      };


      // Get sources fhd, hd, sd source
      const fhdSource = this._createSource('server', '1080', 'fhd', getPayload('fullhd'));
      const hdSource = this._createSource('server', '720', 'hd', getPayload('hd', 'srcHd'));
      const sdSource = this._createSource('server', '480', 'sd', getPayload('sd', 'srcSd'));

      // Set episode data
      episodes[episode].id = episode;
      episodes[episode].title = this.get(item, 'title');

      // Push sources
      if (fhdSource.payload.playlist) episodes[episode].sources.push(fhdSource);
      if (hdSource.payload.playlist) episodes[episode].sources.push(hdSource);
      if (sdSource.payload.playlist) episodes[episode].sources.push(sdSource);

    });
  }

  /**
   * Parse upscale
   *
   * @param playlist
   * @param episodes
   * @private
   */
  _parseUpscale(playlist, episodes) {
    if (this.get(store, 'state.app.settings.player.upscale.process') === true) {
      playlist.forEach(item => {

        // Get episode number
        // It is same as id in anilibria API
        // Get upscale payload
        const episode = this.get(item, 'id');
        const upscalePayload = {url: this.get(item, 'fullhd'), scale: 1};

        episodes[episode].sources.push(this._createSource('upscale', '4096', '4k', {...upscalePayload, scale: 2}));
        episodes[episode].sources.push(this._createSource('upscale', '2048', '2k', {...upscalePayload, scale: 1}));

      });
    }
  }


  /**
   * Get torrents data
   *
   * @param release
   * @return Array
   * @private
   */
  async _getTorrents(release) {

    // Check if torrents should be processed
    if (this.get(store, 'state.app.settings.player.torrents.process') === true) {

      const requests = [];

      (this.get(release, 'torrents') || [])
        .filter(torrent => new RegExp('HEVC').test(torrent.quality) === false)
        .forEach(torrent => {
          requests.push(
            new Promise(async resolve => {
              try {

                // Get blob torrent file from server
                const response = await new AnilibriaProxy().getTorrent({url: torrent.url}, {cancelToken: this.cancelToken});

                // Send to torrent for parsing data
                Torrent.sendToWindow('torrent:parse', {torrentId: torrent.id, blob: response.data});

                // Listen event with torrent data to main process
                // Resolve when event is caught
                ipc.on(`torrent:data:${torrent.id}`, (e, {data}) => resolve({torrent, data}));

              } catch (e) {
                resolve([])
              }
            })
          )
        });


      return (await Promise.allSettled(requests))
        .filter(response => response.status === 'fulfilled')
        .map(response => response.value)
        .filter(torrent => torrent);
    }
  }


  /**
   * Parse torrents
   *
   * @param torrents
   * @param episodes
   * @private
   */
  _parseTorrents(torrents, episodes) {
    torrents.forEach(torrent => {

      const type = 'torrent';
      const label = this.get(torrent, 'torrent.quality') || null;
      const alias = label ? __camelCase(label) : null;
      const files = this.get(torrent, 'data.files') || [];

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
                torrent: {
                  id: this.get(torrent, 'torrent.id'),
                  name: this.get(torrent, 'data.name'),
                  peers: torrent.numPeers,
                  seeders: this.get(torrent, 'torrent.seeders'),
                  datetime: this.get(torrent, 'data.created'),
                  leechers: this.get(torrent, 'torrent.leechers'),
                },
                file: {
                  name: this.get(file, 'name'),
                  path: this.get(file, 'path'),
                  index: k,
                  length: this.get(file, 'length'),
                },
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
  _parseEpisodeFromTorrentFilename(filename) {
    if (filename && typeof filename === 'string') {

      const episode = this.get(filename.match(/_\[(\d+)\]_/), [1]) || null;
      return episode !== null ? parseFloat(episode) : null;

    }

    return null;
  }

}
