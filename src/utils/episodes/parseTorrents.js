// Proxies
import AnilibriaReleaseProxy from "@proxies/release";

// Utils
import __get from 'lodash/get'
import __merge from 'lodash/merge'
import __camelCase from 'lodash/camelCase'

// Episodes
import {getEpisode} from './parseEpisode'

// Resolvers
import TorrentsResolver from "@@/utils/resolvers/torrents";


/**
 * Parse torrents
 *
 * @param torrents
 * @param skip_torrents
 * @param torrents_is_enabled
 * @param cancel_token
 */
export const parseTorrents = async (torrents, {skip_torrents = false, torrents_is_enabled = false, cancel_token = null} = {}) => {
  if (skip_torrents === false && torrents_is_enabled === true) {

    // Filter torrents
    // Exclude HEVC torrents (no codec available)
    const filtered_torrents = _excludeHEVC(torrents);

    // Resolve torrents data
    const resolved_torrents = await Promise.allSettled(
      filtered_torrents.map(async torrent => {

        // Get torrent's id
        // Get blob torrent file from server
        const torrents_id = torrent.id;
        const torrents_file_content = await new AnilibriaReleaseProxy().getReleaseTorrent(torrent.url, {cancelToken: cancel_token});

        // If torrent file content exists
        // Try to to parse this torrent
        if (torrents_file_content) {

          // Parse torrent data
          // Send it to torrent window
          const torrent_parsed_data = await TorrentsResolver.parseTorrent({torrents_id, torrents_file_content});
          return {torrent, ...torrent_parsed_data};
        }

        return null;
      })
    );


    // Parse torrents promises
    // Filter empty ones
    const parsed_torrents = resolved_torrents
      .filter(response => response.status === 'fulfilled')
      .map(response => response.value)
      .filter(torrent => torrent);


    return parsed_torrents.reduce((episodes, parsed_torrent) => {

      const type = 'torrent';
      const label = __get(parsed_torrent, 'torrent.quality') || null;
      const files = __get(parsed_torrent, 'torrent_parsed_data.files') || [];
      const alias = label ? __camelCase(label) : null;

      const parsed_episodes = files.reduce((episodes, file, index) => {

        // Parse episode from torrent filename
        // Try to get number from "..._[1]_..." string
        let episode_id = _parseEpisodeFromTorrentFilename(__get(file, 'name'));

        if (episode_id !== null || files.length === 1) {

          // If there is only one file in torrent
          // And if can't parse episode number -> make it as first (1) episode
          // This is a little bit hack
          if (files.length === 1) episode_id = 1;

          // Create episode
          episodes[episode_id] = {};

          // Set episode data
          episodes[episode_id].id = episode_id;
          episodes[episode_id].title = __get(episodes, [episode_id, 'title'], `Серия ${episode_id}`);
          episodes[episode_id].sources = [].concat(
            episodes[episode_id].sources || [],
            [getEpisode(type, label, alias, _getPayload(file, index, parsed_torrent.torrent, parsed_torrent.torrent_parsed_data))]
          );
        }

        return episodes;
      }, {});
      return __merge(episodes, parsed_episodes);
    }, {});
  }

  return null;
};


/**
 * Exclude HEVC torrents
 *
 * @param torrents
 * @return {*}
 */
const _excludeHEVC = torrents => torrents.filter(torrent => new RegExp('HEVC').test(torrent.quality) === false);


/**
 * Parse episode from torrent filename
 *
 * @param filename
 * @return {null|*}
 * @private
 */
const _parseEpisodeFromTorrentFilename = (filename) => {
  if (filename && typeof filename === 'string') {

    const episode = __get(filename.match(/_\[(\d+)\]_/), [1]) || null;
    return episode !== null ? parseFloat(episode) : null;

  }

  return null;
};


/**
 * Get torrent payload data
 *
 * @param file
 * @param index
 * @param torrent
 * @param torrent_parsed_data
 * @return {*}
 * @private
 */
const _getPayload = (file, index, torrent, torrent_parsed_data) => {
  return {
    torrent: {
      id: __get(torrent, 'id'),
      name: __get(torrent_parsed_data, 'name'),
      peers: __get(torrent_parsed_data, 'numPeers'),
      seeders: __get(torrent, 'seeders'),
      datetime: __get(torrent_parsed_data, 'created'),
      leechers: __get(torrent, 'leechers'),
    },
    file: {
      name: __get(file, 'name'),
      path: __get(file, 'path'),
      index: index,
      length: __get(file, 'length'),
    },
  }
};
