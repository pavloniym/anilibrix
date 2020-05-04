<template>
  <v-slider
    hide-details
    class="timeline"
    :min="0"
    :max="isReady ? duration : 100"
    :value="isReady ? player.currentTime : (watchData ? watchData.percentage : 0)"
    :disabled="isReady === false"
    @change="player.currentTime = $event">
  </v-slider>
</template>

<script>

  import __get from "lodash/get";

  const props = {
    player: {
      type: Object,
      default: null
    },
    watchData: {
      type: Object,
      default: null
    }
  };

  export default  {
    props,
    data() {
      return {
        isReady: false,
        duration: 0,
        isSeeking: false,
      }
    },

    mounted() {

      // Get duration on initial start
      this.player.on('progress', e => {
        this.duration = __get(e, 'detail.plyr.duration');
      });

      // Set loaded metadata ready state
      // Start playing on seeking event
      this.player.on('canplay', () => this.isReady = true);
      this.player.on('seeking', () => this.player.play());
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

  .timeline {
    ::v-deep {
      .v-slider--horizontal {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }

</style>
