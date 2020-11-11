<template>
  <div id="player-container" :class="{'hide-cursor': hideCursor}">
    <slot/>
  </div>
</template>

<script>

  // Utils
  import screenfull from 'screenfull'

  const props = {
    hideCursor: {
      type: Boolean,
      default: false
    }
  };

  export default {
    props,
    destroyed() {

      // Exit fullscreen if video view is exited
      if (screenfull.isEnabled) screenfull.exit();
    }
  }

</script>


<style scoped lang="scss">

  #player-container {
    width: 100%;
    height: 100%;
    z-index: 5;
    position: absolute;
    touch-action: none;

    &.hide-cursor {
      * {
        cursor: none !important;
      }
    }
  }

</style>
