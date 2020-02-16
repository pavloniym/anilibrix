<template>
  <v-slide-y-reverse-transition>
    <v-layout class="player__controls px-4" align-center v-show="isVisible" @keyup.f.stop="enterFullscreen">

      <!-- Back button -->
      <v-btn icon @click="$emit('back')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <!-- Play / Pause -->
      <v-btn icon class="ml-2" @click="plyr.togglePlay()">
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
        @change="plyr.currentTime = $event">
      </v-slider>

      <!-- Time / Duration -->
      <div class="subtitle-2 mx-2">{{getCurrentTimeToHuman}} / {{getDurationToHuman}}</div>

      <!-- Volume Mute -->
      <v-btn icon @click="plyr.muted = !isMuted">
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
        @input="plyr.volume = $event">
      </v-slider>


      <!-- PIP -->
      <v-btn icon class="ml-4" @click="plyr.pip = true">
        <v-icon>mdi-picture-in-picture-bottom-right</v-icon>
      </v-btn>


      <!-- Fullscreen -->
      <v-btn icon class="ml-2" @click="plyr.fullscreen.toggle()">
        <v-icon>mdi-fullscreen</v-icon>
      </v-btn>

    </v-layout>
  </v-slide-y-reverse-transition>
</template>

<script>

  import screenfull from 'screenfull';
  import __get from 'lodash/get'

  const props = {
    container: {
      type: HTMLDivElement,
      default: null
    },
    plyr: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        isVisible: false,
        isPlaying: false,
        isMuted: false,
        isSeeking: false,

        volume: .5,
        duration: 100,
        currentTime: 0,

        mouseHandler: null,
        mouseTimeout: 2500
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
          .map(v => v < 10 ? "0" + v : v)
          .filter((v, i) => v !== "00" || i > 0)
          .join(":")
      },


      /**
       * Show controls
       *
       * @return void
       */
      showControls() {

        // Show controls
        this.isVisible = true;

        // Clear previous interval
        if (this.mouseHandler) {
          clearTimeout(this.mouseHandler);
        }

        // Create new interval
        this.mouseHandler = setTimeout(() => this.isVisible = false, this.mouseTimeout)
      },


      toggleFullscreen(state) {
        if (this.container) {
          screenfull.toggle(this.container);
        }
      }
    },


    mounted() {
      this.$nextTick(() => {

        // Get duration on initial start
        this.plyr.on('progress', e => {
          this.duration = __get(e, 'detail.plyr.duration', 100);
        });


        // Update current player position on time update
        // If now seek event is running
        this.plyr.on('timeupdate', () => {
          if (this.isSeeking === false) {
            this.currentTime = this.plyr.currentTime;
          }
        });


        //
        // this.plyr.on('enterfullscreen', () => this.toggleFullscreen(true));


        // Hide / Show controls
        this.showControls();
        window.addEventListener('mousemove', this.showControls, true);

      })
    },

    watch: {
      plyr: {
        immediate: true,
        deep: true,
        handler(plyr) {
          if (plyr) {
            this.isPlaying = plyr.playing;
            this.isMuted = plyr.muted;
            this.volume = plyr.volume;
            this.duration = plyr.duration;
          }
        }
      }
    }
  }

</script>

<style scoped lang="scss">

  .player {
    &__controls {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 4rem;
      background: rgba(0, 0, 0, 0.5);
      z-index: 2147483647;
    }
  }

</style>
