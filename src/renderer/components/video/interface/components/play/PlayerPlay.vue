<template>
  <v-layout align-center justify-center ref="play">
    <template v-if="is_mounted">

      <!-- Previous episode -->
      <v-tooltip left :attach="$refs.play">
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon large :disabled="!previous" @click="toVideo(release, previous, {fromStart: true})">
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
        </template>
        <div v-if="previous" class="play__tooltip py-2">
          <div class="caption pb-1">{{title}}</div>
          <div class="font-weight-bold">{{previous.title}}</div>
        </div>
      </v-tooltip>

      <v-btn
        icon
        class="mx-2"
        width="90"
        height="90"
        :disabled="is_buffering"
        @click="player.togglePlay()">
        <v-icon size="40">mdi-{{is_playing ? 'pause': 'play'}}</v-icon>
      </v-btn>


      <!-- Next episode -->
      <v-tooltip right :attach="$refs.play">
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon large :disabled="!next" @click="toVideo(release, next, {fromStart: true})">
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
        </template>
        <div v-if="next" class="play__tooltip py-2">
          <div class="caption pb-1">{{title}}</div>
          <div class="font-weight-bold">{{next.title}}</div>
        </div>
      </v-tooltip>

    </template>
  </v-layout>
</template>

<script>

  // Routes
  import { toVideo } from "@utils/router/views";

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
    },
  };

  export default {
    props,
    data() {
      return {
        is_mounted: false,
        is_playing: false,
        is_buffering: true,
      }
    },

    computed: {

      /**
       * Get release title
       *
       * @return {string}
       */
      title() {
        return this.$__get(this.release, 'names.ru');
      },

      /**
       * Get episodes
       *
       * @return Array
       */
      episodes() {
        return this.$__get(this.release, 'episodes') || [];
      },


      /**
       * Get next episode
       *
       * @return Object|null
       */
      next() {
        return this.episodes
          .find(episode => episode.id === (this.$__get(this.episode, 'id') || -1) + 1) || null;
      },

      /**
       * Get previous episode
       *
       * @return {*}
       */
      previous() {
        return this.episodes
          .find(episode => episode.id === (this.$__get(this.episode, 'id') || -1) - 1) || null;
      }

    },

    methods: {

      /**
       * Go to video
       *
       * @param release
       * @param episode
       */
      toVideo,

    },

    created() {

      // Set initial values
      this.is_playing = this.player.playing;

      // Watch for player playing and pause events
      this.player.on('playing', () => this.is_playing = true);
      this.player.on('pause', () => this.is_playing = false);

      // Fixing unknown bug with muted: true after plyer createing
      // TODO: Maybe solve this problem in the best way in the future
      this.player.on('playing', () => {
        if (this.player.volume > 0 && this.player.config.muted) {
          console.log('Fix muted:', this.player.volume, this.player.config.muted)
          document.querySelector('video').muted = false
        }
      });

      // Handler buffering events
      this.player.on('waiting', () => this.is_buffering = true);
      this.player.on('playing', () => this.is_buffering = false);
      this.player.on('emptied', () => this.is_buffering = true);
      this.player.on('stalled', () => this.is_buffering = true);

    },

    mounted() {

      // Set mounted state
      this.is_mounted = true;
    }

  }
</script>

<style lang="scss" scoped>

  .play__tooltip {
    line-height: 1;
    z-index: 1000000;

    > div {
      line-height: 1;
    }
  }

</style>
