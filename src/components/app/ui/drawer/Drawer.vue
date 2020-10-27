<template>
  <v-navigation-drawer
    v-bind="{value, width, ...$attrs}"
    class="drawer"
    :class="{'drawer--mobile': this.isMobile}"
    :style="{zIndex, top: offset, paddingBottom: offset}"
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
       * Get top offset
       *
       * @return {*}
       */
      offset() {
        return this.isDesktop ? this.heightOffset : null;
      },

    }
  }
</script>

<style lang="scss" scoped>

  .drawer {
    ::v-deep {
      .v-navigation-drawer__content {
        overflow-y: scroll;
      }
    }

    ::-webkit-scrollbar-thumb {
      background-color: black;
    }

    ::-webkit-scrollbar {
      border-left: 1px solid #141414;
      background-color: #1E1E1E;
    }


    &--mobile {
      ::-webkit-scrollbar {
        display: none;
      }
    }
  }

</style>
