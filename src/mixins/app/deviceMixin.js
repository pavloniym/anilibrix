import {isWeb, isDesktop} from "@@/utils/states/deviceStates";

export default {
  computed: {

    /**
     * Is web build
     *
     * @return {boolean}
     */
    isWeb() {
      return isWeb();
    },


    /**
     * Is desktop build
     *
     * @return {boolean}
     */
    isDesktop() {
      return isDesktop();
    },


    /**
     * Check if app is in mobile mode
     *
     * @return {boolean}
     */
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown && isWeb();
    }

  }
}
