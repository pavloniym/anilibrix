//import store from "@store/index";
//import __camelCase from "lodash/camelCase";

// Proxies
import AnilibriaReleaseProxy from "@proxies/release";

// Utils
import __get from 'lodash/get'

// Resolvers
import {runOnPlatform} from "@@/utils/resolvers/system/deviceResolver";
import TorrentsResolver from "@@/utils/resolvers/torrents";


/**
 * Exclude HEVC torrents
 *
 * @param torrents
 * @return {*}
 */
const excludeHEVC = torrents => torrents.filter(torrent => new RegExp('HEVC').test(torrent.quality) === false);


/**
 * Parse torrents
 *
 * @param torrents
 * @param skip_torrents
 * @param torrents_enabled
 * @param cancel_token
 */
export const parseTorrents = async (torrents, {skip_torrents = false, torrents_enabled = false, cancel_token = null} = {}) => {
  if (skip_torrents === false && torrents_enabled === true) {

    // Filter torrents
    // Exclude HEVC torrents (no codec available)
    const filtered_torrents = excludeHEVC(torrents);

    // Parse torrents data
    const parsed_torrents = await runOnPlatform(
      async () => null,
      async () => await Promise.allSettled(
        filtered_torrents.map(async torrent => {

          // Get blob torrent file from server
          const torrents_id = torrent.id;
          const torrents_file_content = await new AnilibriaReleaseProxy().getReleaseTorrent(torrent.url, {cancelToken: cancel_token});

          if (torrents_file_content) {

            const response = await TorrentsResolver.parseTorrent(torrents_id, torrents_file_content);
            console.log({torrents_id, response});

          }

          // Check file data is available
          // Resolve empty if null
          /*if (file && file.data) {

            // Send torrent for parsing data
            // Catch torrent for parsing
            // emitTorrentParsing(torrent.id, file.data);
            // handleTorrentParsed(({torrent_id, data}) => torrent.id === torrent_id ? resolve({torrent, data}) : null);

          } else resolve(null)*/

        })
      )
    )
  }
};
/*

/!**
 * Get torrents data
 * Check if torrents should be processed
 *
 * @return {array}
 * @private
 * @param torrents
 *!/
async
_getTorrents(torrents = [])
{

  const torrents_are_skipping = this.skipTorrents === true;
  const torrents_processing_is_enabled = this.get(store, 'state.app.settings.player.torrents.process') === true;

  if (0 && !torrents_are_skipping && torrents_processing_is_enabled) {


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
              // emitTorrentParsing(torrent.id, file.data);
              // handleTorrentParsed(({torrent_id, data}) => torrent.id === torrent_id ? resolve({torrent, data}) : null);

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


/!**
 * Parse torrents
 *
 * @param torrents
 * @param episodes
 * @private
 *!/
_parseTorrents(torrents, episodes)
{
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

/!**
 * Parse episode from torrent filename
 *
 * @param filename
 * @return {null|*}
 * @private
 *!/
_parseEpisodeFromTorrentFilename(filename)
{
  if (filename && typeof filename === 'string') {

    const episode = this.get(filename.match(/_\[(\d+)\]_/), [1]) || null;
    return episode !== null ? parseFloat(episode) : null;

  }

  return null;
}
*/
