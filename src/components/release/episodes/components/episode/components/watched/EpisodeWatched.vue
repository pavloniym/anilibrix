<template>
  <v-btn v-if="hasSeenState" icon color="grey">
    <v-icon>mdi-check</v-icon>
  </v-btn>
</template>

<script>

  // Store
  import {mapGetters} from "vuex";
  import {GET_WATCHED_EPISODE_GETTER} from "@store/app/watch/appWatchStore";

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
      ...mapGetters('app/watch', [GET_WATCHED_EPISODE_GETTER]),

      /**
       * Get watch data
       *
       * @return {*}
       */
      watchedEpisode() {
        return this.release && this.episode
          ? this[GET_WATCHED_EPISODE_GETTER]({release_id: this.release.id, episode_id: this.episode.id})
          : null;
      },

      /**
       * Check if episode is seen
       *
       * @return {boolean}
       */
      hasSeenState() {
        return this.$__get(this.watchedEpisode, 'is_seen') || false;
      }

    }
  }
</script>
