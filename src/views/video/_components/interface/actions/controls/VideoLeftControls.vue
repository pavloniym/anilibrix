<template>
  <v-layout
    align-center
    justify-start
    ref="links"
    :class="{'interface__left__controls--mobile': this.isMobile}">
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
  import Home from './_components/home'
  import Volume from './_components/volume'
  import Release from './_components/release'

  // Mixins
  import {DeviceMixin} from "@mixins/app";

  const props = {
    player: {
      type: Object,
      default: null
    },
    release: {
      type: Object,
      default: null
    },
    source: {
      type: Object,
      default: null
    },
    getTorrentDrawer: {
      type: Function,
      default: null
    }
  };

  export default {
    props,
    mixins: [DeviceMixin],
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
            is: Home,
            visible: true,
          },
          {
            is: Release,
            props: {release: this.release},
            visible: true,
          },
          {
            is: Volume,
            props: {player: this.player},
            events: {
              'update:muted': $event => this.$emit('update:muted', $event),
              'update:volume': $event => this.$emit('update:volume', $event),
            },
            visible: !this.isMobile
          },
        ].filter(item => item.visible === true)
      }
    },

    mounted() {
      this.is_mounted = true;
    }
  }
</script>

<style scoped lang="scss">

  .interface__left__controls--mobile {
    position: absolute;
    top: 12px;
    left: 20px;
  }

</style>
