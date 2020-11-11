<template>
  <div
    :style="seekStyles"
    @mousemove="showSeekTooltip"
    @mouseleave="is_hovered = false">

    <v-slider
      hide-details
      validate-on-blur
      ref="slider"
      color="secondary"
      class="slider__timeline"
      :min="0"
      :max="is_ready ? duration : 100"
      :value="is_ready ? time : 0"
      :class="{'isMobile': this.isMobile}"
      :disabled="is_ready === false"
      :thumb-label="'always'"
      @change="changeTime"
      @mouseup="is_seeking = false"
      @mousedown="is_seeking = true">

      <template v-slot:thumb-label="{ value }">
        <timer v-if="is_seeking" v-bind="{value}"/>
      </template>

    </v-slider>


    <!-- Tooltip -->
    <tooltip
      v-if="!this.isMobile && is_hovered && !is_seeking"
      v-bind="{duration, cursor_left_offset, seek_tooltip_position}">
      <template v-slot="{value}">
        <timer v-bind="{value}"/>
      </template>
    </tooltip>

  </div>
</template>

<script>

  // Components
  import Timer from './_components/timer'
  import Tooltip from './_components/tooltip'

  // Mixins
  import {DeviceMixin} from "@mixins/app";

  // Utils
  import safeAreaInsets from "safe-area-insets";

  const props = {
    player: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    mixins: [DeviceMixin],
    components: {
      Timer,
      Tooltip
    },
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

    computed: {

      /**
       * Seek styles
       *
       * @return {*}
       */
      seekStyles() {
        return {
          position: 'relative',
          marginBottom: safeAreaInsets.bottom + 'px'
        }
      }

    },

    methods: {

      /**
       * Change player time
       *
       * @return {void}
       */
      changeTime(time) {
        this.player.currentTime = time;
        this.$refs.slider.$refs.thumb.blur();
      },


      /**
       * Show time tooltip
       *
       * @param event
       */
      showSeekTooltip(event) {

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

  .slider__timeline {
    cursor: pointer;
    position: relative;

    &.isMobile {
      ::v-deep {
        .v-slider__track-container {
          height: 8px;
        }

        .v-slider__thumb {
          opacity: 1;
        }
      }
    }

    ::v-deep {
      .v-slider--horizontal {
        margin-left: 0;
        margin-right: 0;
      }

      .v-slider__thumb-label-container {
        transition: none !important;
        top: -18px;

        .v-slider__thumb-label {
          height: 0 !important;
          width: 0 !important;
        }
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

    &.isMobile {
      ::v-deep {
        .v-slider__track-container {
          height: 8px;
        }
      }
    }

  }


</style>
