<template>
  <v-overlay :value="visible" :opacity=".85">
    <div v-show="visible" class="player__next">

      <!-- Title -->
      <template v-if="release && next">
        <div class="player__next__label player__next__label--top">
          <h2>{{title}}</h2>
          <h4>{{nextEpisodeTitle}}</h4>
        </div>
      </template>

      <!-- Progress -->
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
          @click="toVideo(release, next)">
          <v-icon large>mdi-skip-next</v-icon>
        </v-btn>
      </v-progress-circular>

      <!-- Cancel -->
      <div class="player__next__label player__next__label--bottom">
        <v-btn text @click="cancel">Отмена</v-btn>
      </div>

    </div>
  </v-overlay>
</template>

<script>

  import {toVideo} from "@utils/router/views";
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
        interval: null,
        is_ended: false,
      }
    },


    computed: {
      ...mapState('app/settings/player', {_autoplay_next: s => s.autoplayNext}),

      /**
       * Get episodes
       *
       * @return {array}
       */
      episodes() {
        return this.$__get(this.release, 'episodes') || [];
      },


      /**
       * Get next episode
       *
       * @return {*|null}
       */
      next() {

        const current_episode_id = this.$__get(this.episode, 'id') || -1;
        const next_episode_id = current_episode_id + 1;

        return this.episodes.find(episode => episode.id === next_episode_id) || null;
      },


      /**
       * Get release title
       *
       * @return {string}
       */
      title() {
        return this.$__get(this.release, 'names.ru');
      },


      /**
       * Next episode title
       *
       * @return {string|null}
       */
      nextEpisodeTitle() {
        return this.$__get(this.next, 'title');
      }

    },

    methods: {

      /**
       * Go to next episode
       *
       * @return void
       */
      toVideo,

      /**
       * Start autoplay
       *
       * @return void
       */
      autoplay() {
        if (this.next) {

          this.value = 0;
          this.visible = true;

          this.timer = setTimeout(() => this.toVideo(this.release, this.next), 3000);
          this.interval = setInterval(() => this.value = this.value + 20, 500);

        }
      },


      /**
       * Cancel autoplay
       *
       * @return void
       */
      cancel() {

        this.value = 0;
        this.visible = false;
        this.is_ended = false;

        if (this.timer) clearTimeout(this.timer);
        if (this.interval) clearInterval(this.interval);

      },

    },


    created() {
      if (this._autoplay_next === true) {

        // Start autoplay component on player ended
        // Or to release page on player ended and no next episode
        this.player.on('ended', () => this.is_ended = true);

        // Cancel autoplay
        this.player.on('seeking', () => {
          if (this.visible) this.cancel();
        })
      }
    },

    destroyed() {

      // Destroy interval and timer
      if (this.timer) clearTimeout(this.timer);
      if (this.interval) clearInterval(this.interval);

    },

    watch: {
      is_ended: {
        handler(is_ended) {
          if (is_ended === true) this.autoplay();
        }
      }
    }

  }
</script>

<style scoped lang="scss">

  .player {
    &__next {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -35px;
      margin-top: -35px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 70px;
      background: rgba(0, 0, 0, 0.30);
      border-radius: 50%;

      &__label {
        position: absolute;
        width: 100vw;
        text-align: center;

        &--top {
          top: -100px;
        }

        &--bottom {
          bottom: -60px;
        }

      }

    }
  }


</style>
