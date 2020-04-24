<template>
  <v-layout align-center justify-end ref="controls">

    <!-- Volume Mute -->
    <v-btn icon large @click="player.muted = !isMuted">
      <v-icon size="24">mdi-volume-{{isMuted ? 'off' : getVolumeState}}</v-icon>
    </v-btn>


    <!-- Volume Level -->
    <v-slider
      hide-details
      min="0"
      max="1"
      step=".1"
      class="mr-2"
      :value="volume"
      :style="{maxWidth: '70px'}"
      @input="player.volume = $event">
    </v-slider>


    <!-- Quality -->
    <v-menu v-if="source" top nudge-left="60" nudge-top="45" :attach="$refs.controls">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon large class="ml-2">
          <v-icon size="24">{{getSourceIcon(source)}}</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item
          v-for="(s, k) in sources"
          :input-value="s.alias === source.alias"
          :key="k"
          @click="_setQuality(s.alias)">
          <v-icon class="mr-2" color="grey">{{getSourceIcon(s)}}</v-icon>
          <v-list-item-subtitle v-text="s.label"/>
        </v-list-item>
      </v-list>
    </v-menu>


    <!-- PIP -->
    <v-btn icon large class="mx-2" @click="player.pip = true">
      <v-icon size="24">mdi-picture-in-picture-bottom-right</v-icon>
    </v-btn>


    <!-- Fullscreen -->
    <v-btn icon large @click="toggleFullscreen">
      <v-icon size="24">mdi-fullscreen</v-icon>
    </v-btn>

  </v-layout>
</template>

<script>

  import __get from 'lodash/get'
  import screenfull from "screenfull";
  import {mapActions} from "vuex";



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
    },
    container: {
      type: HTMLDivElement,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
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

    },

    methods: {
      ...mapActions('app/settings/player', {_setQuality: 'setQuality'}),

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
      },


      /**
       * Handle keyboard event
       *
       * @param e
       * @return void
       */
      handleKeyboardEvent(e) {
        if (e.key === 'f') {
          this.toggleFullscreen();
        }
      },


      /**
       * Enter fullscreen mode
       * Fullscreen div container with player and controls
       *
       * @return void
       */
      toggleFullscreen() {
        if (this.container) {
          screenfull.toggle(this.container);
        }
      },


    },

    mounted() {
      this.$nextTick(() => {

        // Set initial values
        this.isMuted = this.player.muted;
        this.volume = this.player.volume;

        // Watch for player volume change
        // Update player interface
        this.player.on('volumechange', e => {
          this.isMuted = e.detail.plyr.muted;
          this.volume = e.detail.plyr.volume;
        });

        // Add some event listeners
        window.addEventListener('keydown', this.handleKeyboardEvent, true);

      })
    },


    destroyed() {
      window.removeEventListener('keydown', this.handleKeyboardEvent);
    }

  }

</script>
