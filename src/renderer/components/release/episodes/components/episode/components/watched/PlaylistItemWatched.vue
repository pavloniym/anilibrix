<template>
  <v-btn v-if="isSeen" icon color="grey">
    <v-icon>mdi-check</v-icon>
  </v-btn>
</template>

<script>

  import __get from 'lodash/get'

  const props = {
    release: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    computed: {

      /**
       * Get watch data
       *
       * @return {*}
       */
      watchData() {
        if (this.release && this.episode) {

          const release_id = this.release.id;
          const episode_id = this.episode.id;

          // Get watch data for provided release
          return this.$store.getters['app/watch/getWatchData']({release_id, episode_id});
        }
      },

      /**
       * Check if episode is seen
       *
       * @return {boolean}
       */
      isSeen() {
        return __get(this.watchData, 'isSeen') || false;
      }

    }
  }
</script>
