<template>
  <div v-if="value" class="seek__tooltip secondary" :style="{left: cursor_left_offset + 'px'}">
    <slot v-bind="{value}"/>
  </div>
</template>

<script>

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
       * @return {number|null}
       */
      value() {
        if (this.duration && this.seek_tooltip_position) {
          return (this.duration / 100) * this.seek_tooltip_position + 1;
        }
        return null;
      },

    }

  }
</script>


<style scoped lang="scss">

  .seek__tooltip {
    top: -29.5px;
    position: absolute;
    margin-left: -62px;
    border-radius: 4px;
    pointer-events: none;

    &::after {
      content: "";
      width: 2px;
      height: 20px;
      background: inherit;
      display: flex;
      position: absolute;
      left: 50%;
      bottom: -18px;
      pointer-events: none;
    }
  }


</style>
