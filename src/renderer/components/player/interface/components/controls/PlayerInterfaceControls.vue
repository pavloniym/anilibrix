<template>
  <div class="player__interface__controls px-6" ref="controls">

    <!-- Info -->
    <div class="my-4">
      <slot name="info"/>
    </div>

    <!-- Controls -->
    <v-layout align-center>

      <!-- Back button -->
      <v-btn icon @click="$emit('back')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <!-- Play / Pause -->
      <v-btn
        icon
        class="ml-2"
        :disabled="isBuffering"
        @click="player.togglePlay()">

        <v-icon>mdi-{{isPlaying ? 'pause': 'play'}}</v-icon>

      </v-btn>

      <!-- Slider -->
      <v-slider
        class="mx-4"
        hide-details
        :min="0"
        :max="duration"
        :value="currentTime"
        @start="isSeeking = true"
        @end="isSeeking = false"
        @change="player.currentTime = $event">
      </v-slider>

      <!-- Time / Duration -->
      <div class="subtitle-2 mx-2">{{getCurrentTimeToHuman}} / {{getDurationToHuman}}</div>


      <!-- Volume Mute -->
      <v-btn icon @click="player.muted = !isMuted">
        <v-icon>mdi-volume-{{isMuted ? 'off' : getVolumeState}}</v-icon>
      </v-btn>


      <!-- Volume Level -->
      <v-slider
        min="0"
        max="1"
        step=".1"
        hide-details
        :value="volume"
        :style="{maxWidth: '70px'}"
        @input="player.volume = $event">
      </v-slider>


      <!-- Quality -->
      <v-menu v-if="source" top nudge-left="60" nudge-top="45" :attach="$refs.controls">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon class="ml-2">
            <v-icon>{{getSourceIcon(source)}}</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            v-for="(s, k) in sources"
            :input-value="s.alias === source.alias"
            :key="k"
            @click="$emit('source', s)">
            <v-icon class="mr-2" color="grey">{{getSourceIcon(s)}}</v-icon>
            <v-list-item-subtitle v-text="s.label"/>
          </v-list-item>
        </v-list>
      </v-menu>


      <!-- PIP -->
      <v-btn icon class="ml-2" @click="player.pip = true">
        <v-icon>mdi-picture-in-picture-bottom-right</v-icon>
      </v-btn>


      <!-- Fullscreen -->
      <v-btn icon class="ml-2" @click="$emit('fullscreen')">
        <v-icon>mdi-fullscreen</v-icon>
      </v-btn>

    </v-layout>
  </div>
</template>

<script>

  import __get from 'lodash/get'

  const props = {
    player: {
      type: Object,
      default: null
    },
    sources: {
      type: Array,
      default: null
    },
    source: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        isBuffering: false,
        isPlaying: false,
        isMuted: false,
        isSeeking: false,

        volume: .5,
        duration: 100,
        currentTime: 0,
      }
    },

    computed: {

      /**
       * Get volume state
       *
       * @return {string}
       */
      getVolumeState() {
        if (this.volume <= .33) return 'low';
        if (this.volume > .33 && this.volume <= .66) return 'medium';
        if (this.volume > .66) return 'high';
      },

      /**
       * Get total duration in human format
       *
       * @return string
       */
      getDurationToHuman() {
        return this.toHHMMSS(this.duration);
      },

      /**
       * Get current time in human format
       * @return {*}
       */
      getCurrentTimeToHuman() {
        return this.toHHMMSS(this.currentTime);
      }
    },

    methods: {

      /**
       * Convert seconds to human readable format
       *
       * @param secs
       * @return {string}
       */
      toHHMMSS(secs) {
        const sec_num = parseInt(secs, 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor(sec_num / 60) % 60;
        const seconds = sec_num % 60;

        return [hours, minutes, seconds]
          .map(v => v < 10 ? '0' + v : v)
          .filter((v, i) => v !== '00' || i > 0)
          .join(':')
      },

      /**
       * Get source icon
       *
       * @param source
       * @return {string|null}
       */
      getSourceIcon(source) {

        const type = __get(source, 'type');
        const alias = __get(source, 'alias');

        if (type === 'server') {
          if (alias === 'sd') return 'mdi-standard-definition';
          if (alias === 'hd' || alias === 'fhd') return 'mdi-high-definition';
        } else if (type === 'torrent') return 'mdi-alpha-t';

        return null;
      }

    },

    mounted() {
      this.$nextTick(() => {

        // Set initial values
        this.isPlaying = this.player.playing;
        this.isMuted = this.player.muted;
        this.volume = this.player.volume;

        // Get duration on initial start
        this.player.on('progress', e => {
          this.duration = __get(e, 'detail.plyr.duration');
        });

        // Update current player position on time update
        // If now seek event is running
        this.player.on('timeupdate', () => {
          const time = this.player.currentTime;
          if (this.isSeeking === false && time && time > 0) {
            this.currentTime = time;
          }
        });

        // Watch for player playing and pause events
        this.player.on('playing', () => this.isPlaying = true);
        this.player.on('pause', () => this.isPlaying = false);

        // Watch for player volume change
        // Update player interface
        this.player.on('volumechange', e => {
          this.isMuted = e.detail.plyr.muted;
          this.volume = e.detail.plyr.volume;
        });

        // Handler buffering events
        this.player.on('waiting', () => this.isBuffering = true);
        this.player.on('canplay', () => this.isBuffering = false);

      })
    },

    watch: {
      currentTime: {
        immediate: true,
        handler(time) {
          this.$emit('time', time);
        }
      }
    }
  }

</script>

<style scoped lang="scss">

  .player {
    &__interface {
      &__controls {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 10rem;
        z-index: 10;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.35) 30%, rgba(0, 0, 0, 0.7) 60%);
        user-select: none;
      }
    }

  }

</style>
