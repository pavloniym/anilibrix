export default {
  computed: {

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
  }

}
