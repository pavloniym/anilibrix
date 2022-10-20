<template>
  <v-btn v-if="isSeen" icon color="grey">
    <v-icon>mdi-check</v-icon>
  </v-btn>
</template>

<script>

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
      watch() {
        if (this.release && this.episode) {

          const release_id = this.release.id;
          const episode_id = this.episode.id;

          // Get watch data for provided release
          const payload = {release_id, episode_id};
          return this.$store.getters['app/watch/getWatchedEpisode'](payload);
        }
      },

      /**
       * Check if episode is seen
       *
       * @return {boolean}
       */
      isSeen() {
        return this.$__get(this.watch, 'isSeen') || false;
      }

    }
  }
</script>
