
/**
 * Parse upscale
 *
 * @param playlist
 * @param episodes
 * @private
 */

/*_parseUpscale(playlist, episodes) {
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
}*/
