<template>
  <error v-if="_has_error"/>
  <v-layout v-else column justify-center class="releases">

    <slider
      v-bind="{loading}"
      v-model="index"
      class="mb-4"
      :releases="_releases"
      @next="next"
      @previous="previous"
      @toVideo="toVideo(release.id, episode.id)">
    </slider>

    <!-- Release Data -->
    <release v-bind="{loading, release, episode}" class="mb-4" :key="release ? release.id : null"/>

    <!-- Actions Button -->
    <!-- Actions Loader -->
    <actions
      v-bind="{loading}"
      @action:video="toVideo(release.id, episode.id)"
      @action:release="toRelease(release.id)">
    </actions>

  </v-layout>
</template>

<script>

  // Components
  import Error from './components/error'
  import Slider from './components/slider'
  import Release from './components/release'
  import Actions from './components/actions'

  // Store
  import {mapState, mapActions} from 'vuex'

  // Mixins
  import {KeyboardHandlerMixin} from "@mixins/handlers";

  // Routes
  import {toVideo} from "@router/video/videoRoutes";
  import {toRelease} from "@router/release/releaseRoutes";

  export default {
    name: 'Releases.View',
    meta: {
      title: 'Последние релизы'
    },
    mixins: [KeyboardHandlerMixin],
    components: {
      Error,
      Slider,
      Release,
      Actions,
    },

    data() {
      return {
        loading: true,
      }
    },

    computed: {
      ...mapState('app', {
        _drawer: s => s.drawer,
        _is_searching: s => s.is_searching,
      }),

      ...mapState('releases', {
        _index: s => s.index,
        _loading: s => s.loading,
        _releases: s => s.data || [],
        _has_error: s => s.has_error,
      }),


      index: {

        /**
         * Get release index using it's hash
         * If no releases with last saved hash -> get first
         *
         * @return number
         */
        get() {
          const releaseIndex = this._releases.findIndex(release => this._index === release.id);
          return releaseIndex > -1
            ? releaseIndex
            : 0;
        },

        /**
         * Get hash from release with provided index
         * Save hash to store
         *
         * @param index
         * @return void
         */
        set(index) {
          this._setIndex(this._releases[index] ? this._releases[index].id : null);
        }
      },


      /**
       * Get active release
       *
       * @return {*|null}
       */
      release() {
        return this._releases[this.index] || null;
      },


      /**
       * Get episode
       *
       * @return Object|null
       */
      episode() {
        return this.$__get(this.release, ['episodes', 0]) || null;
      }

    },


    methods: {
      ...{toVideo, toRelease},
      ...mapActions('releases', {_setIndex: 'setIndex'}),

      /**
       * Listen keyboard event
       *
       * @param e
       * @return void
       */
      handleKeyboardEvents(e) {
        const code = e.which || e.keyCode;

        // space || enter
        if (code === 32 || code === 13) {
          if (this._drawer === false && this._is_searching === false) {
            toVideo(this.release.id, this.episode.id);
          }
        }

        // left and right arrows
        if (code === 37) this.previous();
        if (code === 39) this.next();

      },


      /**
       * Move to next slide
       *
       * @return void
       */
      next() {
        if (this.index < this._releases.length - 1) {
          this.index = this.index + 1;
        }
      },


      /**
       * Move to previous slide
       *
       * @return void
       */
      previous() {
        if (this.index > 0) {
          this.index = this.index - 1;
        }
      },


    },

    mounted() {
      this.$visit(this.$route.path, this.$metaInfo.title);
    },


    watch: {

      _loading: {
        immediate: true,
        handler(_loading) {
          if (_loading === false && this.loading === true) {
            this.loading = false;
          }
        }
      },

      _has_error: {
        handler() {
          this.loading = true;
        }
      }

    }

  }
</script>
