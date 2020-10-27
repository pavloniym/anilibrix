<template>
  <div ref="settings" :style="{position: 'relative'}">

    <!-- Settings  -->
    <v-btn icon large @click="showSettings('selector')">
      <v-icon size="22">mdi-settings</v-icon>
    </v-btn>

    <!-- Handler -->
    <component
      v-if="handler"
      v-on="handler.events"
      v-bind="handler.props"
      :is="handler.is"
      :key="handler.alias"
      :attach="() => $refs.settings"
      @back="showSettings('selector')"
      @close="closeSettings"
      @update:component="showSettings">
    </component>

  </div>
</template>

<script>

  // Components
  import Speed from './_cards/speed'
  import Quality from './_cards/quality'
  import Hotkeys from './_cards/hotkeys'
  import Selector from './_cards/selector'

  // Mixins
  import {DeviceMixin} from "@mixins/app";

  const props = {
    episode: {
      type: Object,
      default: null
    },
    source: {
      type: Object,
      default: null
    },
    player: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    mixins: [DeviceMixin],
    data() {
      return {
        component: null,
        is_visible: false,
      }
    },

    computed: {

      /**
       * Get available settings
       *
       * @return {array}
       */
      settings() {
        return [
          {
            is: Selector,
            alias: 'selector',
            props: {source: this.source, player: this.player},
            visible: true,
          },
          {
            is: Quality,
            alias: 'quality',
            props: {source: this.source, player: this.player, episode: this.episode},
            events: {'update:quality': $event => this.$emit('update:quality', $event)},
            visible: true,
          },
          {
            is: Speed,
            alias: 'speed',
            props: {player: this.player},
            events: {'update:speed': $event => this.$emit('update:speed', $event)},
            visible: true,
          },
          {
            is: Hotkeys,
            alias: 'hotkeys',
            visible: !this.isMobile
          }
        ].filter(item => item.visible === true)
      },


      /**
       * Get active handler
       *
       * @return {*}
       */
      handler() {
        return this.settings.find(item => item.alias === this.component) || null;
      }

    },

    methods: {

      /**
       * Close settings
       *
       * @return {void}
       */
      closeSettings() {
        this.component = null;
      },


      /**
       * Show settings component
       *
       * @param component
       * @return {void}
       */
      showSettings(component) {
        this.component = component;
      }
    }

  }
</script>
