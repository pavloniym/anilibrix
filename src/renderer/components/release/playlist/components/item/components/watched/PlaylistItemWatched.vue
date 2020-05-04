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
          return this.$store.getters['firebase/watch/getData']({
            releaseId: this.release.id,
            episodeId: this.episode.id
          });
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
