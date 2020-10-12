<template>
  <v-layout align-center justify-end ref="controls">
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

  import PIP from './_components/pip'
  import Settings from './_components/settings'
  import Episodes from './_components/episodes'
  import Fullscreen from './_components/fullscreen'

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
            }
          },
          {
            is: PIP,
            events: {click: () => this.$emit('toggle:pip')}
          },
          {
            is: Fullscreen,
            events: {click: () => this.$emit('toggle:fullscreen')}
          }
        ]
      }

    },

    mounted() {
      this.is_mounted = true;
    },

  }

</script>
