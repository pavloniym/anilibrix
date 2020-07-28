<template>
  <div v-if="isVisible" class="system-bar--placeholder" :class="{fixed}"></div>
</template>

<script>

  import {AppPlatformMixin} from '@mixins/app'

  const props = {
    fixed: {
      type: Boolean,
      default: null
    }
  };

  export default {
    props,
    mixins: [AppPlatformMixin],
    computed: {

      /**
       * Check if placeholder is visible
       *
       * @return {boolean}
       */
      isVisible() {
        return !!(this.isWindows || (this.isMac && !this.isOnFullscreen));
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
