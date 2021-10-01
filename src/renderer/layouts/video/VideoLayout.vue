<template>
  <div id="player-container" :class="{'hide-cursor': hideCursor}">
    <slot/>
  </div>
</template>

<script>

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
      // if (screenfull.isEnabled) screenfull.exit();
    }
  }

</script>


<style scoped lang="scss">

  #player-container {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;

    &.hide-cursor {
      * {
        cursor: none !important;
      }
    }
  }

</style>
