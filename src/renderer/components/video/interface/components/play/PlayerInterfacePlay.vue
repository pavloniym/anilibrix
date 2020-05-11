<template>
  <v-layout align-center justify-center>

    <!-- Previous episode -->
    <v-tooltip left>
      <template v-slot:activator="{on}">
        <v-btn v-on="on" icon large :disabled="previous === null" @click="watchEpisode(previous)">
          <v-icon>mdi-skip-previous</v-icon>
        </v-btn>
      </template>
      <div v-if="previous" class="play__tooltip py-2">
        <div class="caption pb-1">{{release.names.ru}}</div>
        <div class="font-weight-bold">{{previous.title}}</div>
      </div>
    </v-tooltip>

    <v-btn
      icon
      class="mx-2"
      width="90"
      height="90"
      :disabled="isBuffering"
      @click="player.togglePlay()">
      <v-icon size="40">mdi-{{isPlaying ? 'pause': 'play'}}</v-icon>
    </v-btn>


    <!-- Next episode -->
    <v-tooltip right>
      <template v-slot:activator="{on}">
        <v-btn v-on="on" icon large :disabled="next === null" @click="watchEpisode(next)">
          <v-icon>mdi-skip-next</v-icon>
        </v-btn>
      </template>
      <div v-if="next" class="play__tooltip py-2">
        <div class="caption pb-1">{{release.names.ru}}</div>
        <div class="font-weight-bold">{{next.title}}</div>
      </div>
    </v-tooltip>

  </v-layout>
</template>

<script>

  import __get from 'lodash/get'

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
        isPlaying: false,
        isBuffering: true,
      }
    },

    computed: {

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

      /**
       * Get previous episode
       *
       * @return {*}
       */
      previous() {
        return this.episodes
          .find(episode => episode.id === (__get(this.episode, 'id') || -1) - 1) || null;
      }

    },

    methods: {


      /**
       * Watch episode
       *
       * @param episode
       */
      watchEpisode(episode) {
        this.$router.push({
          name: 'video',
          params: {
            key: `${this.release.id}:${episode.id}`,
            release: this.release,
            episode: episode,
            fromStart: true,
          }
        })
      },

    },

    created() {

      // Set initial values
      this.isPlaying = this.player.playing;

      // Watch for player playing and pause events
      this.player.on('playing', () => this.isPlaying = true);
      this.player.on('pause', () => this.isPlaying = false);


      // Handler buffering events
      this.player.on('waiting', () => this.isBuffering = true);
      this.player.on('playing', () => this.isBuffering = false);
      this.player.on('emptied', () => this.isBuffering = true);
      this.player.on('stalled', () => this.isBuffering = true);

    }

  }
</script>

<style lang="scss" scoped>

  .play__tooltip {
    line-height: 1;

    > div {
      line-height: 1;
    }
  }

</style>
