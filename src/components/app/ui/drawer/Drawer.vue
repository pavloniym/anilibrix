<template>
  <v-navigation-drawer
    v-bind="{value, width, ...$attrs}"
    :style="drawerStyles"
    :stateless="this.isMobile"
    @input="$emit('input', $event)">

    <!-- Content -->
    <slot/>

    <!-- Footer -->
    <div v-if="$slots['footer']" class="caption grey--text px-4 my-4">
      <slot name="footer"/>
    </div>

  </v-navigation-drawer>
</template>

<script>

  // Mixins
  import {PlatformMixin, DeviceMixin, FullscreenMixin} from '@mixins/app'

  const props = {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '350'
    },
    zIndex: {
      type: [String, Number],
      default: null
    }
  };

  export default {
    props,
    mixins: [
      DeviceMixin,
      PlatformMixin,
      FullscreenMixin
    ],

    computed: {

      /**
       * Get drawer styles
       *
       * @return {*}
       */
      drawerStyles() {
        return {
          top: this.isDesktop ? this.heightOffset : null,
          zIndex: this.zIndex,
          paddingBottom: this.isDesktop ? this.heightOffset : null
        }
      }

    }
  }
</script>

<style lang="scss" scoped>

  .drawer {

    ::-webkit-scrollbar-thumb {
      background-color: black;
    }

    ::-webkit-scrollbar {
      border-left: 1px solid #141414;
      background-color: #1E1E1E;
    }
  }

</style>
