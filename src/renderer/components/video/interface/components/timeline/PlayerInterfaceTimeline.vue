<template>
  <v-slider
    hide-details
    class="timeline"
    :min="0"
    :max="isReady ? duration : 100"
    :value="currentTime"
    @start="isSeeking = true"
    @end="isSeeking = false"
    @change="player.currentTime = $event">
  </v-slider>
</template>

<script>

  import __get from "lodash/get";

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
        isReady: false,
        duration: 0,
        isSeeking: false,
        currentTime: null,
      }
    },

    mounted() {
      this.$nextTick(() => {

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

        // Set loaded metadata ready state
        this.player.on('loadedmetadata', () => this.isReady = true);

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

  .timeline {
    ::v-deep {
      .v-slider--horizontal {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }

</style>
