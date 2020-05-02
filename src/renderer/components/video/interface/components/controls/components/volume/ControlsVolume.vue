<template>
  <v-layout align-center class="shrink">

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
      :style="{maxWidth: '70px', width: '70px'}"
      @input="player.volume = $event">
    </v-slider>

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
        isMuted: false,
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


    mounted() {

      // Set initial values
      this.volume = this.player.volume;
      this.isMuted = this.player.muted;

      // Watch for player volume change
      // Update player interface
      this.player.on('volumechange', e => {
        this.volume = e.detail.plyr.volume;
        this.isMuted = e.detail.plyr.muted;
      });

    },


  }
</script>
