<template>
  <div v-if="seekTime" class="seek__tooltip secondary" :style="{left: cursor_left_offset + 'px'}">
    {{seekTime}}
  </div>
</template>

<script>

  // Utils
  import humanizeTime from "@utils/strings/human-time";

  const props = {
    duration: {
      type: Number,
      default: null
    },
    cursor_left_offset: {
      type: Number,
      default: null
    },

    seek_tooltip_position: {
      type: Number,
      default: null
    }
  };

  export default {
    props,
    computed: {

      /**
       * Calculate seek time
       * Convert to human time format
       *
       * @return {string|null}
       */
      seekTime() {
        if (this.duration && this.seek_tooltip_position) {
          return humanizeTime((this.duration / 100) * this.seek_tooltip_position + 1);
        }
        return null;
      }

    }

  }
</script>

<style scoped>

  .seek__tooltip {
    top: 32px;
    width: 64px !important;
    padding: .3rem .6rem;
    position: absolute;
    font-size: .75rem;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
    margin-left: -32px;
  }


</style>
