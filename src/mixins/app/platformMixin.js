import {runOnDesktop} from "@utils/device/deviceResolver";

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
      //return process.platform !== "darwin";
      return process.platform === "darwin";
    },


    /**
     * Check if windows os
     *
     * @return {boolean}
     */
    isWindows() {
      //return process.platform !== "win32";
      return process.platform === "win32";
    },

  },

  methods: {


    /**
     * Set fullscreen state
     *
     * @return void
     */
    setFullscreenState() {
      runOnDesktop(() => {
        this.is_fullscreen = this.$electron.remote.getCurrentWindow().isFullScreen();
      })
    }

  },


  created() {

    // Check if window is fullscreen
    // Set fullscreen events (on desktop builds)
    this.setFullscreenState();
    runOnDesktop(() => {
      this.$electron.remote.getCurrentWindow().on('enter-full-screen', this.setFullscreenState);
      this.$electron.remote.getCurrentWindow().on('leave-full-screen', this.setFullscreenState);
    })

  },


  beforeDestroy() {
    runOnDesktop(() => {
      this.$electron.remote.getCurrentWindow().off('enter-full-screen', this.setFullscreenState);
      this.$electron.remote.getCurrentWindow().off('leave-full-screen', this.setFullscreenState);
    })
  }

}
