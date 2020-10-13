// Utils
import __get from 'lodash/get'

// Episodes
import {getEpisode} from './parseEpisode'


/**
 * Parse playlist
 *
 * @param playlist
 * @return {*}
 */
export const parsePlaylist = (playlist = []) => {
  return (playlist || []).reduce((episodes, episode) => {

    // Get episode number
    // It is same as id in anilibria API
    const episode_id = __get(episode, 'id');

    // Create episode
    episodes[episode_id] = {};

    // Set episode data
    episodes[episode_id].id = episode_id;
    episodes[episode_id].title = __get(episode, 'title');
    episodes[episode_id].sources = [];

    const sd_source = getSDSource(episode);
    const hd_source = getHDSource(episode);
    const fhd_source = getFHDSource(episode);

    // Push sources
    if (fhd_source.payload.playlist) episodes[episode_id].sources.push(fhd_source);
    if (hd_source.payload.playlist) episodes[episode_id].sources.push(hd_source);
    if (sd_source.payload.playlist) episodes[episode_id].sources.push(sd_source);

    return episodes;

  }, {});
};


/**
 * Get item payload
 * Use playlist key and file key
 *
 * @param episode
 * @param playlistKey
 * @param fileKey
 * @return {*}
 */
const _getPayload = (episode, playlistKey = null, fileKey = null) => {
  return {
    file: __get(episode, fileKey) || null,
    playlist: __get(episode, playlistKey) || null,
  }
};



/**
 * Get full hd source
 *
 * @param episode
 * @return {{payload: *, alias: *, label: *, type: *}}
 */
export const getFHDSource = episode => getEpisode('server', '1080p', 'fhd', _getPayload(episode, 'fullhd'));


/**
 * Get hd source
 *
 * @param episode
 * @return {{payload: *, alias: *, label: *, type: *}}
 */
export const getHDSource = episode => getEpisode('server', '720p', 'hd', _getPayload(episode, 'hd'));


/**
 * Get sd source
 *
 * @param episode
 * @return {{payload: *, alias: *, label: *, type: *}}
 */
export const getSDSource = episode => getEpisode('server', '480p', 'sd', _getPayload(episode, 'sd'));
