<template>
  <v-slider
    hide-details
    ref="slider"
    color="secondary"
    class="slider__timeline"
    :min="0"
    :max="is_ready ? duration : 100"
    :value="is_ready ? time : 0"
    :disabled="is_ready === false"
    @change="player.currentTime = $event"
    @mousedown="is_seeking = true"
    @mouseup="is_seeking = false">

    <template v-slot:thumb-label="{ value }">
      <div class="time font-weight-bold">{{humanTime(value)}}</div>
    </template>

  </v-slider>
</template>

<script>

  import humanTime from "@/renderer/src/utils/strings/human-time";
  import {AppKeyboardHandlerMixin} from '@/renderer/src/mixins/app'

  const props = {
    player: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    mixins: [AppKeyboardHandlerMixin],
    data() {
      return {
        time: 0,
        is_ready: false,
        duration: 0,
        is_seeking: false,
      }
    },

    methods: {

      /**
       * Get human time
       *
       * @param secs
       * @return {number}
       */
      humanTime,
    },

    mounted() {

      // Get time
      // Check that user is not seeking
      this.player.on('timeupdate', () => {
        if(this.is_seeking === false) {
          this.time = this.player.currentTime
        }
      });

      // Get duration on initial start
      this.player.on('progress', () => this.duration = this.player.duration);

      // Set loaded metadata ready state
      // Start playing on seeking event
      this.player.on('playing', () => this.is_ready = true);
      this.player.on('seeking', () => this.player.play());

    },

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

  }

  ::v-deep .v-slider {
    &__thumb {
      &-label {
        height: auto !important;
        width: 56px !important;
        transform: none !important;
        margin-left: -28px;
        margin-bottom: 15px;
        border-radius: 4px;
        padding: .3rem .6rem;
        background-color: red !important;

        .time {
          font-size: .75rem;
        }

        > div {
          transform: none;
        }
      }
    }
  }


</style>
