<template>
  <v-slider
    hide-details
    class="timeline"
    :min="0"
    :max="isReady ? duration : 100"
    :value="isReady ? time : 0"
    :disabled="isReady === false"
    @change="player.currentTime = $event">
  </v-slider>
</template>

<script>

  const props = {
    player: {
      type: Object,
      default: null
    }
  };

  export default  {
    props,
    data() {
      return {
        isReady: false,
        time: 0,
        duration: 0,
      }
    },

    created() {

      // Get time
      this.player.on('timeupdate', () => {
        this.time = this.player.currentTime;
      });

      // Get duration on initial start
      this.player.on('progress', () => {
        this.duration = this.player.duration;
      });


      // Set loaded metadata ready state
      // Start playing on seeking event
      this.player.on('playing', () => this.isReady = true);
      this.player.on('seeking', () => this.player.play());
    }
  }
</script>

<style scoped lang="scss">

  .timeline {
    ::v-deep {
      .v-slider--horizontal {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }

</style>
