<template>
  <div class="player__controls px-6" ref="controls">

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


      <!-- Quality -->
      <v-menu top v-if="quality" :attach="$refs.controls">
        <template v-slot:activator="{ on }">
          <v-btn icon class="ml-2" v-on="on">
            <v-icon>{{quality.icon}}</v-icon>
          </v-btn>
        </template>
        <v-list dense width="7rem">
          <v-list-item
            v-for="(q, k) in getAvailableQualities"
            :input-value="q.type === quality.type"
            :key="k"
            @click="$emit('update:quality', q)">
            <v-icon class="mr-2" color="grey">{{q.icon}}</v-icon>
            <v-list-item-subtitle v-text="q.label"/>
          </v-list-item>
        </v-list>
      </v-menu>


      <!-- PIP -->
      <v-btn icon class="ml-2" @click="plyr.pip = true">
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
    type: {
      type: String,
      default: null
    },
    plyr: {
      type: Object,
      default: null
    },
    qualities: {
      type: Array,
      default: null
    },
    quality: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
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
      },


      /**
       * Get available qualities
       *
       * @return array
       */
      getAvailableQualities() {
        return (this.qualities || []).filter(quality => quality.path)
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
      }
    },


    mounted() {
      this.$nextTick(() => {

        // Set initial values
        this.isPlaying = this.plyr.playing;
        this.isMuted = this.plyr.muted;
        this.volume = this.plyr.volume;

        // Get duration on initial start
        this.plyr.on('progress', e => {
          this.duration = __get(e, 'detail.plyr.duration');
        });


        // Update current player position on time update
        // If now seek event is running
        this.plyr.on('timeupdate', () => {
          const time = this.plyr.currentTime;
          if (this.isSeeking === false && time && time > 0) {
            this.currentTime = time;
          }
        });


        this.plyr.on('playing', () => this.isPlaying = true);
        this.plyr.on('pause', () => this.isPlaying = false);
        this.plyr.on('volumechange', e => {
          this.isMuted = e.detail.plyr.muted;
          this.volume = e.detail.plyr.volume;
        })

      })
    },
  }

</script>

<style scoped lang="scss">

  .player {
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

</style>
