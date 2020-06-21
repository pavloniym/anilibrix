<template>
  <v-layout column justify-center class="releases">

    <slider
      v-bind="{loading}"
      v-model="index"
      class="mb-4"
      :releases="_releases"
      @next="showNextRelease"
      @previous="showPreviousRelease"
      @toEpisode="toEpisode">
    </slider>
    <release v-bind="{loading, release, episode}" class="mb-4" :key="release ? release.id : null"/>
    <actions v-bind="{loading}" @toEpisode="toEpisode" @toRelease="toRelease"/>

  </v-layout>
</template>

<script>

  import Slider from './components/slider'
  import Release from './components/release'
  import Actions from './components/actions'

  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'Releases.View',
    meta: {title: 'Последние релизы'},
    components: {
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
            this.toEpisode();
          }
        }

        // left and right arrows
        if (code === 37) this.showPreviousRelease();
        if (code === 39) this.showNextRelease();

      },


      /**
       * Move to next slide
       *
       * @return void
       */
      showNextRelease() {
        if (this.index < this._releases.length - 1) {
          this.index = this.index + 1;
        }
      },


      /**
       * Move to previous slide
       *
       * @return void
       */
      showPreviousRelease() {
        if (this.index > 0) {
          this.index = this.index - 1;
        }
      },


      /**
       * Watch episode
       * Go to player with provided release and episode
       *
       * @return void
       */
      toEpisode() {
        if (this.release && this.episode) {
          const releaseName = this.$__get(this.release, 'names.original');
          this.$router.push({
            name: 'video',
            params: {
              key: `${this.release.id}:${this.episode.id}`,
              release: this.release,
              episode: this.episode,
              releaseName,
            }
          });
        }
      },


      /**
       * Go to release
       *
       * @return void
       */
      toRelease() {
        if (this.release) {
          const releaseId = this.$__get(this.release, 'id');
          const releaseName = this.$__get(this.release, 'names.original');
          this.$router.push({
            name: 'release',
            params: {releaseId, releaseName}
          })
        }
      }

    },


    mounted() {
      document.addEventListener('keydown', this.handleKeyboardEvents);
    },


    beforeDestroy() {
      document.removeEventListener('keydown', this.handleKeyboardEvents);
    },


    watch: {

      _loading: {
        immediate: true,
        handler(_loading) {
          if (_loading === false && this.loading === true) {
            this.loading = false;
          }
        }
      }

    }

  }
</script>

<style lang="scss" scoped>

  .releases {
    &::-webkit-scrollbar-thumb {
      background-color: red;
    }

    &::-webkit-scrollbar {
      width: 9px;
      background-color: red;
    }

  }

</style>
