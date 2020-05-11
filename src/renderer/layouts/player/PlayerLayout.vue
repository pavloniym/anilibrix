<template>
    <div class="player__container">
      <slot/>
    </div>
</template>

<script>

  import screenfull from 'screenfull'

  export default {

    destroyed() {

      // Exit fullscreen if video view is exited
      if(screenfull.isEnabled) {
        screenfull.exit();
      }
    }

  }

</script>


<style scoped lang="scss">

  .player__container {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

</style>
