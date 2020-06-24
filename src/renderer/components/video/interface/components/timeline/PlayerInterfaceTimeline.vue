<template>
  <v-layout>

    <!--<div v-if="tooltip.visible" class="slider__time white black&#45;&#45;text" :style="{left: tooltip.left + 'px'}">
      test
    </div>-->

    <v-slider
      hide-details
      ref="slider"
      class="slider__timeline"
      :min="0"
      :max="isReady ? duration : 100"
      :value="isReady ? time : 0"
      :disabled="isReady === false"
      @hover="handleHover"
      @change="player.currentTime = $event">
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
        time: 0,
        isReady: false,
        duration: 0,

        tooltip: {
          visible: false,
          left: 0,
        }
      }
    },

    methods: {


      /**
       * Handle keyboard event
       *
       * @param e
       * @return void
       */
      handleKeyboardEvent(e) {
        if (e.which === 39) this.forward();
        if (e.which === 37) this.rewind();
      },


      /**
       * Forward player
       * Check max duration at the end
       *
       * @return void
       */
      forward() {
        this.player.currentTime = this.player.currentTime + 10 >= this.player.duration
          ? this.player.duration - .1
          : this.player.currentTime + 10;
      },


      /**
       * Rewind player
       *
       * @return void
       */
      rewind() {
        this.player.currentTime = this.player.currentTime - 10 < 0
          ? 0
          : this.player.currentTime - 10;
      },


      handleHover(e) {
        console.log(e);
      }


    },

    mounted() {

      // Get time
      this.player.on('timeupdate', () => this.time = this.player.currentTime);

      // Get duration on initial start
      this.player.on('progress', () => this.duration = this.player.duration);

      // Set loaded metadata ready state
      // Start playing on seeking event
      this.player.on('playing', () => this.isReady = true);
      this.player.on('seeking', () => this.player.play());

      // Set keyboard events
      window.addEventListener('keydown', this.handleKeyboardEvent);

      /*this.$refs.slider.$el.addEventListener('mouseover', e => {
        console.log(e);
        this.tooltip.visible = true;
        this.tooltip.left = e.offsetX;
      })*/

    },

    beforeDestroy() {

      // Remove keyboard events
      window.removeEventListener('keydown', this.handleKeyboardEvent);
    }

  }
</script>

<style scoped lang="scss">

  .slider {

    &__timeline {
      cursor: pointer;
      position: relative;

      ::v-deep {
        .v-slider--horizontal {
          margin-left: 0;
          margin-right: 0;
        }
      }
    }

    &__time {
      position: absolute;
      top: -25px;
    }

  }

</style>
