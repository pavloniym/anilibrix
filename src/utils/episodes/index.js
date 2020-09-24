import {parsePlaylist} from './parsePlaylist'
import {parseTorrents} from './parseTorrents';


/**
 * Get  source
 *
 * @param type
 * @param label
 * @param alias
 * @param payload
 * @return {{payload: *, alias: *, label: *, type: *}}
 */
export const getEpisode = (type, label, alias, payload) => ({type, label, alias, payload});


export {
  parsePlaylist,
  parseTorrents,
}
