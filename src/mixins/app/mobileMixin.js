import {DeviceMixin} from "@mixins/app/index";

export default {
  mixins: [DeviceMixin],
  computed: {

    /**
     * Check if app is in mobile mode
     *
     * @return {*}
     */
    isMobile() {
      return this.$vuetify.breakpoint.mobile && this.isWeb;
    }

  }
}
