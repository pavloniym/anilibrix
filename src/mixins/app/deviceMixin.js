export default {
  computed: {

    /**
     * Is web build
     *
     * @return {boolean}
     */
    isWeb() {
      return process.env.IS_WEB === true;
    },


    /**
     * Is desktop build
     *
     * @return {boolean}
     */
    isDesktop() {
      return process.env.IS_DESKTOP === true;
    }

  }
}
