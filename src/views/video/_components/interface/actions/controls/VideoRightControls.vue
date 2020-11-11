<template>
  <v-layout align-center justify-end ref="controls" :class="{'isMobile': this.isMobile}" :style="controlsStyles">
    <template v-if="is_mounted">
      <component
        v-on="control.events"
        v-for="(control, k) in controls"
        v-bind="control.props"
        :is="control.is"
        :key="k"
        :class="control.classes">
      </component>
    </template>
  </v-layout>
</template>

<script>

  // Components
  import PIP from './_components/pip'
  import Settings from './_components/settings'
  import Episodes from './_components/episodes'
  import Fullscreen from './_components/fullscreen'

  // Mixins
  import {DeviceMixin} from "@mixins/app";

  // Utils
  import safeAreaInsets from "safe-area-insets";

  const props = {
    player: {
      type: Object,
      default: null
    },
    source: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    mixins: [
      DeviceMixin
    ],
    data() {
      return {
        is_mounted: false
      }
    },

    computed: {

      /**
       * Get controls
       *
       * @return {array}
       */
      controls() {
        return [
          {
            is: Episodes,
            visible: true,
          },
          {
            is: Settings,
            props: {
              source: this.source,
              player: this.player,
              episode: this.episode,
            },
            events: {
              'update:speed': $event => this.$emit('update:speed', $event),
              'update:quality': $event => this.$emit('update:quality', $event),
            },
            visible: true,
          },
          {
            is: PIP,
            events: {click: () => this.$emit('toggle:pip')},
            visible: !this.isMobile,
          },
          {
            is: Fullscreen,
            events: {click: () => this.$emit('toggle:fullscreen')},
            visible: !this.isMobile,
          }
        ].filter(item => item.visible === true)
      },


      /**
       * Get controls styles
       *
       * @return {*}
       */
      controlsStyles() {
        return {
          top: 12 + safeAreaInsets.top + 'px'
        }
      }

    },

    mounted() {
      this.is_mounted = true;
    },

  }

</script>

<style scoped lang="scss">

  .isMobile {
    right: 20px;
    position: absolute;
  }

</style>
