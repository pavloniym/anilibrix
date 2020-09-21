import store from "@store/index";
import AnilibriaReleaseProxy from "@proxies/release";
import __camelCase from "lodash/camelCase";

/*

/!**
 * Get torrents data
 * Check if torrents should be processed
 *
 * @return {array}
 * @private
 * @param torrents
 *!/
async _getTorrents(torrents = []) {

  const torrents_are_skipping = this.skipTorrents === true;
  const torrents_processing_is_enabled = this.get(store, 'state.app.settings.player.torrents.process') === true;

  if (0 && !torrents_are_skipping && torrents_processing_is_enabled) {

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

/!**
 * Parse episode from torrent filename
 *
 * @param filename
 * @return {null|*}
 * @private
 *!/
_parseEpisodeFromTorrentFilename(filename) {
  if (filename && typeof filename === 'string') {

    const episode = this.get(filename.match(/_\[(\d+)\]_/), [1]) || null;
    return episode !== null ? parseFloat(episode) : null;

  }

  return null;
}*/
