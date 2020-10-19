// Resolvers
import {runInRenderer} from "@@/utils/resolvers/system/processResolver";

export default {

  data() {
    return {
      is_fullscreen: false
    }
  },

  computed: {

    /**
     * Check if current windows is on fullscreen
     *
     * @return {boolean}
     */
    isOnFullscreen() {
      return !!this.is_fullscreen;
    },


    /**
     * Set height offset
     *
     * @return {*}
     */
    heightOffset() {
      return this.is_fullscreen ? null : '40px';
    }
  },

  methods: {

    /**
     * Set fullscreen state
     *
     * @return void
     */
    _setFullscreenState() {
      runInRenderer(electron => this.is_fullscreen = electron.remote.getCurrentWindow().isFullScreen());
    }

  },

  created() {

    // Check if window is fullscreen
    this._setFullscreenState();

    // Set fullscreen events (on desktop builds)
    runInRenderer(electron => {
      electron.remote.getCurrentWindow().on('enter-full-screen', this._setFullscreenState);
      electron.remote.getCurrentWindow().on('leave-full-screen', this._setFullscreenState);
    });

  },


  beforeDestroy() {
    runInRenderer(electron => {
      electron.remote.getCurrentWindow().off('enter-full-screen', this._setFullscreenState);
      electron.remote.getCurrentWindow().off('leave-full-screen', this._setFullscreenState);
    });
  }

}
