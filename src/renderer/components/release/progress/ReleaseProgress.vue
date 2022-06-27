<template>
  <v-progress-linear
    v-bind="{height, color}"
    class="release__progress"
    :class="{square}"
    :value="progress"
    :indeterminate="loading">

    <template v-if="!loading && showNumbers" v-slot>
      <div class="release__progress__description caption white--text font-weight-bold px-4">

        <!-- Complete All Episodes -->
        <span v-if="isComplete">
          <span v-if="!dense">Просмотрены все эпизоды</span>
          <span v-else>Все эпизоды</span>
        </span>

        <!-- Not seen episodes -->
        <span v-else-if="isUnseen">
          <span v-if="!dense">Не просмотрено ни одного эпизода</span>
          <span v-else>Ни одного эпизода</span>
        </span>

        <!-- Episodes Progress -->
        <span v-else>
          <span v-if="!dense">Просмотрено {{watched}} из {{episodes.length}}</span>
          <span v-else>{{watched}} из {{episodes.length}}</span>
        </span>

      </div>
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
    },
    dense: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    square: {
      type: Boolean,
      default: false
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
        const watched_episodes = this.$store.getters['app/watch/getWatchedEpisodes'](payload);
        return pluralize(watched_episodes.length, ['эпизод', 'эпизода', 'эпизодов'])

      },

      /**
       * Check if release is fully watched
       *
       * @return {boolean}
       */
      isComplete() {
        return this.progress === 100;
      },


      /**
       * Check if release is not seen
       *
       * @return {boolean}
       */
      isUnseen() {
        return this.progress === 0;
      }

    }
  }
</script>

<style lang="scss" scoped>

  .release__progress {
    cursor: default;
    border-radius: 4px !important;
    transition: height 0s;

    &.square {
      border-radius: 0 !important;
    }

    &__description {
      left: 0;
      position: absolute;
    }
  }

</style>
