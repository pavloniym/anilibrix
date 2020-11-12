<template>
  <v-progress-linear
    v-bind="{height, color}"
    class="release__progress"
    :class="{square}"
    :value="progress"
    :indeterminate="is_loading">

    <template v-if="!is_loading && show_numbers" v-slot>
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

  // Utils
  import pluralize from "@utils/strings/pluralize";

  // Store
  import {mapGetters} from 'vuex'
  import {GET_RELEASE_PROGRESS_GETTER, GET_WATCHED_EPISODES_GETTER} from "@store/app/watch/appWatchStore";

  const props = {
    color: {
      type: String,
      default: 'secondary'
    },
    release: {
      type: Object,
      default: null
    },
    episodes: {
      type: Array,
      default: null
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
    square: {
      type: Boolean,
      default: false
    },
    is_loading: {
      type: Boolean,
      default: false,
    },
    show_numbers: {
      type: Boolean,
      default: true
    }
  };

  export default {
    props,
    computed: {
      ...mapGetters('app/watch', [GET_RELEASE_PROGRESS_GETTER, GET_WATCHED_EPISODES_GETTER]),

      /**
       * Calculate total seen progress
       *
       * @return {*}
       */
      progress() {
        const release_id = this.release.id;
        const total_episodes_number = (this.episodes || []).length;
        const payload = {release_id, total_episodes_number};

        return this[GET_RELEASE_PROGRESS_GETTER](payload);
      },


      /**
       * Get watched episodes
       *
       * @return {string}
       */
      watched() {

        // Get release data and total episodes number
        // Get payload data
        const release_id = this.release.id;
        const total_episodes_number = (this.episodes || []).length;
        const payload = {release_id, total_episodes_number};

        // Get watched episodes
        const watched_episodes = this[GET_WATCHED_EPISODES_GETTER](payload);

        // Convert to string with suffix
        return pluralize(watched_episodes.length, ['эпизод', 'эпизода', 'эпизодов'])
      },


      /**
       * Check if release if fully watched
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
