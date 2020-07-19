// Proxy
import AnilibriaReleaseProxy from "@proxies/release";

// Transformer
import BaseTransformer from "@transformers/BaseTransformer";

// Utils
import store from '@store'
import __camelCase from 'lodash/camelCase'

// Handlers
import {catchTorrentParsedData, sendTorrentParse} from "@main/handlers/torrents/torrentsHandler";


export default class EpisodesTransformer extends BaseTransformer {

  constructor({cancelToken = null, skipTorrents = false} = {}) {
    super();
    this.cancelToken = cancelToken;
    this.skipTorrents = skipTorrents;
  }


  /**
   * Make fetch item async/await
   *
   * @param playlist
   * @param torrents
   * @return {Promise<*>}
   */
  async fetchItem({playlist, torrents}) {
    return await this.fetch({playlist, torrents});
  }


  /**
   * Transform episodes data
   *
   * @returns Promise
   * @param playlist
   * @param torrents
   */
  async fetch({playlist, torrents}) {
    try {

      const episodes = {};

      // Parse playlist
      // Parse upscale
      // Parse torrents
      //this._parseUpscale(playlist, episodes);
      this._parsePlaylist(playlist || [], episodes);
      this._parseTorrents(await this._getTorrents(torrents || []), episodes);

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
   * Check if torrents should be processed
   *
   * @return {array}
   * @private
   * @param torrents
   */
  async _getTorrents(torrents = []) {
    if (this.skipTorrents === false && this.get(store, 'state.app.settings.player.torrents.process') === true) {

      // Filter torrents
      // Exclude HEVC torrents (no codec available)
      const filteredTorrents = torrents
        .filter(torrent => new RegExp('HEVC').test(torrent.quality) === false);


      // Try to parse all torrents data
      return (await Promise
        .allSettled(
          filteredTorrents.map(torrent => new Promise(async resolve => {

              // Get blob torrent file from server
              const file = await new AnilibriaReleaseProxy().getReleaseTorrent(torrent.url, {cancelToken: this.cancelToken});

              // Check file data is available
              // Resolve empty if null
              if (file && file.data) {

                // Send torrent for parsing data
                // Catch torrent for parsing
                sendTorrentParse(torrent.id, file.data);
                catchTorrentParsedData(torrent.id, data => resolve({torrent, data}));

              } else resolve(null);

            })
          )
        ))
        .filter(response => response.status === 'fulfilled')
        .map(response => response.value)
        .filter(torrent => torrent);
    }

    return [];
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
