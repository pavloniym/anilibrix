<template>
  <v-progress-linear v-bind="{color, height}" class="release__progress" :value="progress">
    <template v-if="showNumbers" v-slot>
      <div class="caption white--text font-weight-bold">{{watched}} из {{episodes.length}}</div>
    </template>
  </v-progress-linear>
</template>

<script>

  import pluralize from "@utils/strings/pluralize";

  const props = {
    release: {
      type: Object,
      default: null
    },
    episodes: {
      type: Array,
      default: null
    },
    showNumbers: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'secondary'
    },
    height: {
      type: [Number, String],
      default: '25'
    }
  };

  export default {
    props,
    computed: {

      /**
       * Calculate total seen progress
       *
       * @return {*}
       */
      progress() {

        const release_id = this.release.id;
        const total_episodes_number = (this.episodes || []).length;
        const payload = {release_id, total_episodes_number};

        return this.$store.getters['app/watch/getReleaseProgress'](payload);

      },


      /**
       * Get watched episodes
       *
       * @return {*}
       */
      watched() {

        const release_id = this.release.id;
        const total_episodes_number = (this.episodes || []).length;
        const payload = {release_id, total_episodes_number};

        // Get watched episodes
        // Convert to string with suffix
        const watched_episodes = this.$store.getters['app/watch/getReleaseWatchedEpisodes'](payload);
        return pluralize(watched_episodes.length, ['эпизод', 'эпизода', 'эпизодов'])

      }

    }
  }
</script>

<style lang="scss" scoped>

  .release__progress {
    cursor: default;
    border-radius: 4px;
  }

</style>
