// Proxy + Transformers
import ReleaseProxy from "@proxies/release";
import BaseTransformer from "@transformers/BaseTransformer";

// Parsing episode data
import {parsePlaylist, parseTorrents} from "@utils/episodes";

// Utils
import __merge from "lodash/merge";

export default class ReleaseTransformer extends BaseTransformer {

  constructor() {
    super();
    this.store = null;
    this.cancel_token = null;
    this.with_episodes = false;
    this.skip_torrents = false;
  }


  /**
   * Method used to transform a fetched collection.
   *
   * @param releases
   * @returns {Array} The transformed items.
   */
  async fetchCollection(releases) {
    return await Promise.all((releases || []).map(async release => this.fetchItem(release)));
  }


  /**
   * Make fetch item async/await
   *
   * @param release
   * @return {Promise<*>}
   */
  async fetchItem(release) {
    return this.fetch(release);
  }


  /**
   * Transform incoming data
   *
   * @param release
   * @returns {{}}
   */
  async fetch(release) {
    return {
      id: this.get(release, 'id'),
      year: this.get(release, 'year'),
      type: this.get(release, 'type'),
      code: this.get(release, 'code'),
      names: this._getNames(release),
      genres: this.get(release, 'genres') || [],
      poster: this._getPoster(release),
      datetime: this._getDatetime(release),
      playlist: this.get(release, 'playlist'),
      torrents: this.get(release, 'torrents'),
      episodes: await this._getEpisodes(release),
      description: this.stripHtml(this.get(release, 'description')),
    }
  }

  /**
   * Set store
   *
   * @param store
   * @return {ReleaseTransformer}
   */
  setStore(store) {
    this.store = store;
    return this;
  }


  /**
   * Set cancel token
   *
   * @param cancel_token
   * @return {ReleaseTransformer}
   */
  setCancelToken(cancel_token) {
    this.cancel_token = cancel_token;
    return this;
  }

  /**
   * Set skip torrents
   *
   * @param skip_torrents_state
   * @return {ReleaseTransformer}
   */
  setSkipTorrents(skip_torrents_state = true) {
    this.skip_torrents = skip_torrents_state;
    return this;
  }


  /**
   * Set with episodes state
   *
   * @param with_episodes_state
   * @return {ReleaseTransformer}
   */
  fetchWithEpisodes(with_episodes_state = true) {
    this.with_episodes = with_episodes_state;
    return this;
  }


  /**
   * Get release names
   *
   * @param release
   * @return {{ru: *, original: *}}
   * @private
   */
  _getNames(release) {
    return {
      ru: this.stripHtml(this.get(release, 'names[0]')),
      original: this.stripHtml(this.get(release, 'names[1]'))
    }
  }

  /**
   * Get release datetime
   *
   * @param release
   * @return {{system: null, human: string, timestamp: *}}
   */
  _getDatetime(release) {

    const timestamp = this.get(release, 'last');
    const system = timestamp ? new Date(timestamp * 1000) : null;
    const human = system ? new Intl.DateTimeFormat(undefined, {}).format(system) : null;

    return {timestamp, system, human}
  }


  /**
   * Get poster image path
   *
   * @param release
   * @return {string}
   * @private
   */
  _getPoster(release) {
    return new ReleaseProxy().getReleasePosterPath(this.get(release, 'poster'));
  }


  /**
   * Get episodes
   *
   * @param release
   * @return {array}
   * @private
   */
  async _getEpisodes(release) {
    if (this.with_episodes === true) {

      // Parse episodes from release torrents files
      const torrent_episodes = await parseTorrents(this.get(release, 'torrents') || [], {
        cancel_token: this.cancel_token,
        skip_torrents: this.skip_torrents,
        torrents_enabled: this.get(this.store, 'state.app.settings.player.torrents.enabled') === true,
      });

      // Parse episodes from release playlist links
      const playlist_episodes = parsePlaylist(this.get(release, 'playlist') || []);

      // Filter all sources without payload
      // Reverse order -> first in array === last in release
      return Object
        .values(__merge(torrent_episodes, playlist_episodes))
        .map(episode => ({...episode, sources: episode.sources.filter(source => source.payload !== null)}))
        .filter(episode => episode.sources && episode.sources.length > 0)
        .reverse();

    }
  }

}
