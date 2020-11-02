<template>
  <v-layout
    align-center
    justify-center
    ref="play"
    class="interface__play"
    :class="{'interface__play--mobile': this.isMobile}">
    <template v-if="is_mounted">

      
      <!-- Previous episode -->
      <v-tooltip left :attach="$refs.play">
        <template v-slot:activator="{on}">
          <v-btn
            v-on="on"
            icon
            large
            class="play__button"
            :disabled="!previous"
            @click="toEpisode(previous)">
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
        </template>
        <div v-if="previous" class="play__tooltip py-2">
          <div class="caption pb-1">{{title}}</div>
          <div class="font-weight-bold">{{previous.title}}</div>
        </div>
      </v-tooltip>

      <!-- Play - Pause button -->
      <v-btn
        icon
        class="mx-2 play__button"
        width="90"
        height="90"
        :disabled="is_buffering"
        @click="$emit('toggle:play')">
        <v-icon size="40">mdi-{{is_playing ? 'pause': 'play'}}</v-icon>
      </v-btn>


      <!-- Next episode -->
      <v-tooltip right :attach="$refs.play">
        <template v-slot:activator="{on}">
          <v-btn
            v-on="on"
            icon
            large
            class="play__button"
            :disabled="!next"
            @click="toEpisode(next)">
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

  // Mixins
  import {DeviceMixin} from "@mixins/app";

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
    mixins: [DeviceMixin],
    data() {
      return {
        handler: null,
        is_mounted: false,
        is_playing: false,
        is_buffering: false,
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
       * Emit to episode event
       * Play from start of episode
       *
       * @param episode
       */
      toEpisode(episode) {
        if (this.release && episode) {
          this.$emit('play:episode', {
            params: {from_start: true},
            episode_id: episode.id,
            release_id: this.release.id
          });
        }
      },


      /**
       * Rewind
       *
       * @return {void}
       */
      rewind() {
        this.$refs.rewind.classList.remove("animation");
        this.player.currentTime = Math.max(0, this.player.currentTime - 30);
        this.$refs.rewind.classList.add("animation");
        setTimeout(() => this.$refs.rewind.classList.remove("animation"), 650);
      }

    },

    created() {
      this.handler = setInterval(() => {

        this.is_playing = this.player.playing;
        this.is_buffering = this.player.loading;

      }, 200);
    },

    mounted() {
      this.is_mounted = true;
    },

    destroyed() {
      if (this.handler) {
        clearInterval(this.handler);
      }
    }

  }
</script>

<style lang="scss" scoped>

  .interface__play {
    pointer-events: none;

    &--mobile {
      top: calc(50% - 45px);
      left: 0;
      right: 0;
      height: 90px;
      position: absolute;
    }

    .play__button {
      pointer-events: all;
    }

    .play__tooltip {
      line-height: 1;

      > div {
        line-height: 1;
      }
    }
  }


</style>
