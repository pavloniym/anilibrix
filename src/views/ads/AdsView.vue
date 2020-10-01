<template>
  <v-layout column fill-height class="ads black">
    <video ref="video" autoplay muted playsinline/>
  </v-layout>
</template>

<script>

  // Components
  import AppToolBar from "@components/app/toolbar";

  // Utils
  import __shuffle from 'lodash/shuffle'
  //import {toReleases} from "@utils/router/views";

  const props = {
    to: {
      type: Object,
      default: null
    }
  };
  export default {
    props,
    name: "Ads.View",
    meta: {title: 'Реклама'},
    components: {
      AppToolBar
    },

    data() {
      return {
        plyr: null,
        is_exiting: false,
      }
    },


    computed: {


      /**
       * Get random tag url from env
       *
       * @return {string|null}
       */
      tagUrl() {

        const available_urls = process.env.ADS_URLS;
        const parsed_urls = available_urls ? available_urls.split(',') : [];
        const shuffled_urls = __shuffle(parsed_urls);

        return shuffled_urls[0] ? shuffled_urls[0] : null;
      },


      /**
       * Get options
       *
       * @return {{}}
       */
      options() {
        return {
          ads: {
            tagUrl: this.tagUrl,
            enabled: true
          },
          debug: false,
          autoplay: true,
          controls: false,
        }
      },

      /**
       * Get next route
       *
       * @return {{}}
       */
      nextRoute() {
        return this.to
          ? {name: this.to.name, params: this.to.params}
          : {name: 'releases'}
      }

    },


    methods: {

      /**
       * Go to route
       *
       * @return {void}
       */
      toRoute() {
        if (this.is_exiting === false) {
          this.is_exiting = true;
          this.$router.push(this.nextRoute);
        }
      },

      /**
       * Go to releases
       *
       * @return {void}
       */
     // toReleases,


      /**
       * Handle error
       *
       * @return {void}
       */
      handleError() {
        if (this.is_exiting === false) {
          this.toRoute();
        }
      }

    },

    mounted() {

      // Create player
      this.plyr = new this.$plyr(this.$refs.video, this.options);
      this.plyr.on('ready', () => this.plyr.play());

      // Set error handler
      // Show error message
      // Go to route
      this.plyr.ads.on('error', this.handleError);

      // After time is ended
      // Automatically push to to route
      this.plyr.on('adsimpression', () => this.toRoute());

      // If no url provided -> push to route
      if (this.tagUrl === null) this.toRoute();
    }

  }

</script>
<style lang="scss" scoped>

  .ads {
    ::v-deep {
      .plyr__ads {
        &::after {
          content: none !important;
        }
      }

    }
  }


</style>
