<template>
  <div v-if="isVisible" class="system-bar--placeholder" :class="{fixed}"></div>
</template>

<script>

  import {mapState} from 'vuex'

  const props = {
    fixed: {
      type: Boolean,
      default: null
    }
  };

  export default {
    props,
    computed: {
      ...mapState('app', {
        _is_mac: s => s.is_mac,
        _is_windows: s => s.is_windows,
        _is_fullscreen: s => s.is_fullscreen,
      }),


      /**
       * Check if placeholder is visible
       *
       * @return {boolean}
       */
      isVisible() {
        return !!(this._is_windows || (this._is_mac && !this._is_fullscreen));
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
