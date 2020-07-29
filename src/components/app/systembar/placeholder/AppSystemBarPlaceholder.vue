<template>
  <div v-if="isVisible" class="system-bar--placeholder" :class="{fixed}"></div>
</template>

<script>

  import {PlatformMixin} from '@mixins/app'

  const props = {
    fixed: {
      type: Boolean,
      default: null
    }
  };

  export default {
    props,
    mixins: [PlatformMixin],
    computed: {

      /**
       * Check if placeholder is visible
       *
       * @return {boolean}
       */
      isVisible() {

        const is_windows = this.isWindows;
        const is_mac_not_fullscreen = this.isMac && !this.isOnFullscreen;

        return is_windows || is_mac_not_fullscreen;
      }
    }

  }
</script>

<style scoped lang="scss">

  .system-bar {
    &--placeholder {
      height: 38px;
      background: #191919;

      &.fixed {
        top: 0;
        width: 100%;
        z-index: 1;
        position: fixed;
      }
    }
  }
</style>
