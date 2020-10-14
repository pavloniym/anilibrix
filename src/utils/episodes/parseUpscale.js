// Utils
import __get from 'lodash/get'

// Episodes
import {getEpisode} from './parseEpisode'
import {getHDSource} from "./parsePlaylist";

/**
 * Parse upscale
 *
 * @param playlist
 * @param upscale_is_enabled
 * @return {*}
 */
export const parseUpscale = (playlist = [], {upscale_is_enabled = false} = {}) => {
  if (upscale_is_enabled === true) {
    return (playlist || []).reduce((episodes, episode) => {

      // Get episode number
      // Get upscale hd payload from episode
      const episode_id = __get(episode, 'id');
      const upscale_hd_payload = __get(getHDSource(episode), 'payload');

      // Create episode
      episodes[episode_id] = {};

      // Set episode data
      episodes[episode_id].id = episode_id;
      episodes[episode_id].title = __get(episode, 'title');
      episodes[episode_id].sources = [];

      // Push 2k and 4k sources
      episodes[episode_id].sources.push(getEpisode('upscale', '4k', 'upscale_4k', {...upscale_hd_payload, scale: 2}));
      episodes[episode_id].sources.push(getEpisode('upscale', '2k', 'upscale_2k', {...upscale_hd_payload, scale: 1}));

      return episodes;

    }, {});
  }
  return null;
};
