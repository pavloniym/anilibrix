export default {

  data() {
    return {
      is_fullscreen: false,
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
     * Check if mac os
     *
     * @return {boolean}
     */
    isMac() {
      return process.platform === "darwin";
    },


    /**
     * Check if windows os
     *
     * @return {boolean}
     */
    isWindows() {
      return process.platform === "win32";
    },


    /**
     * Is mac and on fullscreen
     *
     * @return {boolean}
     */
    isMacOnFullscreen() {
      return !!(this.isMac && this.isOnFullscreen);
    }


  },

  methods: {


    /**
     * Set fullscreen state
     *
     * @return void
     */
    setFullscreenState() {
      this.is_fullscreen = require('@electron/remote').getCurrentWindow().isFullScreen();
    }

  },


  created() {

    // Check if window is fullscreen
    this.setFullscreenState();

    // Set fullscreen events
    require('@electron/remote').getCurrentWindow().on('enter-full-screen', this.setFullscreenState);
    require('@electron/remote').getCurrentWindow().on('leave-full-screen', this.setFullscreenState);
  },


  beforeDestroy() {

    // Remove fullscreen events
    require('@electron/remote').getCurrentWindow().off('enter-full-screen', this.setFullscreenState);
    require('@electron/remote').getCurrentWindow().off('leave-full-screen', this.setFullscreenState);

  }

}
