<template>
  <v-layout
    align-center
    class="shrink"
    @mouseenter="is_collapsed = false"
    @mouseleave="is_collapsed = true">

    <!-- Volume Mute -->
    <v-btn icon large @click="$emit('update:muted', !is_muted)">
      <v-icon size="24">mdi-volume-{{getVolumeState}}</v-icon>
    </v-btn>

    <!-- Volume Level -->
    <v-slide-x-transition>
      <v-slider
        v-if="!is_collapsed"
        hide-details
        min="0"
        max="1"
        step=".1"
        :value="is_muted ? 0 : volume"
        :style="{maxWidth: '70px', width: '70px'}"
        @input="$emit('update:volume', $event)">
      </v-slider>
    </v-slide-x-transition>

  </v-layout>
</template>

<script>

  const props = {
    player: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        volume: .5,
        is_muted: false,
        is_collapsed: true,
      }
    },
    computed: {

      /**
       * Get volume state
       *
       * @return {string}
       */
      getVolumeState() {
        if (this.is_muted) return 'off';
        if (this.volume <= .33) return 'low';
        if (this.volume > .33 && this.volume <= .66) return 'medium';
        if (this.volume > .66) return 'high';
      },

    },


    mounted() {

      // Set initial values
      this.volume = this.player.volume;
      this.is_muted = this.player.muted;

      // Watch for player volume change
      // Update player interface
      this.player.on('volumechange', e => {
        this.volume = this.player.volume;
        this.is_muted = this.player.muted;
      });

    },


  }
</script>
