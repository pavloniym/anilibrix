<template>
  <div @mousemove="showSeekTooltip" @mouseleave="is_hovered = false" :style="{position: 'relative'}">
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
      @mouseup="is_seeking = false"
      @mousedown="is_seeking = true">
    </v-slider>


    <!-- Tooltip -->
    <tooltip v-if="is_hovered" v-bind="{duration, cursor_left_offset, seek_tooltip_position}"/>

  </div>
</template>

<script>

  // Components
  import Tooltip from './_components/tooltip'

  // Mixins
  import {DeviceMixin} from "@mixins/app";

  const props = {
    player: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    mixins: [DeviceMixin],
    components: {Tooltip},
    data() {
      return {
        time: 0,
        is_ready: false,
        duration: 0,
        is_seeking: false,
        is_hovered: false,
        cursor_left_offset: 0,
        seek_tooltip_position: 0,
      }
    },

    methods: {

      /**
       * Show time tooltip
       *
       * @param event
       */
      showSeekTooltip(event) {

        // Reset values
        //this.is_hovered = false;
        //this.seek_tooltip_position = 0;

        // Calculate hover percentage
        const client_rect = this.$refs.slider.$el.getBoundingClientRect();
        const percent = (100 / client_rect.width) * (event.pageX - client_rect.left);

        // If percentage correct -> show tooltip
        this.is_hovered = true;
        this.cursor_left_offset = event.pageX;
        this.seek_tooltip_position = parseFloat(percent);


      }
    },

    mounted() {

      // Get time
      // Check that user is not seeking
      this.player.on('timeupdate', () => {
        if (this.is_seeking === false) {
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

        .v-slider__track-container {
          transition: height .2s ease;
        }

        .v-slider__thumb {
          opacity: 0;
          transition: opacity .2s ease;
        }
      }

      &:hover {
        ::v-deep {
          .v-slider__track-container {
            height: 6px;
          }

          .v-slider__thumb {
            opacity: 1;
          }
        }
      }
    }
  }

</style>
