<template>
  <v-overlay :value="visible">
    <v-layout column align-center justify-center>

      <template v-if="release && next">
        <h2>{{next.title}}</h2>
        <h4>{{release.names.ru}}</h4>
      </template>

      <v-progress-circular
        v-bind="{value}"
        size="80"
        class="my-6"
        rotate="-90">
        <v-btn
          icon
          width="80"
          height="80"
          :style="{backgroundColor: '#ffffff45'}"
          @click="toEpisode">
          <v-icon large>mdi-skip-next</v-icon>
        </v-btn>
      </v-progress-circular>

      <v-btn text @click="cancelAutoplay">Отмена</v-btn>

    </v-layout>
  </v-overlay>
</template>

<script>

  import __get from "lodash/get";
  import {mapState} from 'vuex'

  const props = {
    player: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null
    },
    release: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        value: 0,
        timer: null,
        visible: false,
        isEnded: false,
        interval: null,
      }
    },


    computed: {
      ...mapState('app/settings/player', {_autoplayNext: s => s.autoplayNext}),

      /**
       * Get episodes
       *
       * @return Array
       */
      episodes() {
        return __get(this.release, 'episodes') || [];
      },


      /**
       * Get next episode
       *
       * @return Object|null
       */
      next() {
        return this.episodes
          .find(episode => episode.id === (__get(this.episode, 'id') || -1) + 1) || null;
      },


    },

    methods: {

      /**
       * Get next episode
       *
       * @return Object|null
       */
      getNextEpisode() {
        return this.next;
      },

      /**
       * Start autoplay
       *
       * @return void
       */
      startAutoplay() {

        this.value = 0;
        this.visible = true;

        this.interval = setInterval(() => this.value = this.value + 20, 1000);
        this.timer = setTimeout(() => this.toEpisode(), 6000);

      },


      /**
       * Cancel autoplay
       *
       * @return void
       */
      cancelAutoplay() {

        this.value = 0;
        this.visible = false;
        this.isEnded = false;

        if (this.timer) clearTimeout(this.timer);
        if (this.interval) clearInterval(this.interval);

      },

      /**
       * Go to release
       *
       * @return void
       */
      toRelease() {
        this.$router.push({
          name: 'release',
          params: {
            releaseId: this.release.id
          }
        })
      },


      /**
       * Go to next episode
       *
       * @return void
       */
      toEpisode() {
        if (this.release && this.next) {
          this.$router.push({
            name: 'video',
            params: {
              key: `${this.release.id}:${this.next.id}`,
              release: this.release,
              episode: this.next,
              fromStart: true,
            }
          });
        }
      }

    },


    created() {
      if (this._autoplayNext === true) {

        // Start autoplay component on player ended
        // Or to release page on player ended and no next episode
        this.player.on('ended', () => this.isEnded = true);

        // Cancel autoplay
        this.player.on('seeking', () => {
          if (this.visible) {
            this.cancelAutoplay();
          }
        })
      }
    },

    destroyed() {

      // Destroy interval and timer
      if (this.timer) clearTimeout(this.timer);
      if (this.interval) clearInterval(this.interval);

    },

    watch: {
      isEnded: {
        handler(isEnded) {
          if (isEnded === true) {
            this.next ? this.startAutoplay() : null;
          }
        }
      }
    }

  }
</script>
