<template>
  <v-menu
    v-model="is_visible"
    top
    left
    ref="settings"
    nudge-top="55"
    min-width="320px"
    nudge-right="30"
    :close-on-content-click="false">

    <!-- Settings -->
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon large>
        <v-icon size="24">mdi-settings</v-icon>
      </v-btn>
    </template>

    <!-- Handler -->
    <component
      v-on="handler.events"
      v-bind="handler.props"
      class="video__settings__items"
      :is="handler.is"
      :key="handler.alias"
      @back="component = 'selector'"
      @close="is_visible = false"
      @update:component="component = $event">
    </component>

  </v-menu>
</template>

<script>

  // Components
  import Speed from './_components/speed'
  import Quality from './_components/quality'
  import Selector from './_components/selector'

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
    data() {
      return {
        component: 'selector',
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
          },
          {
            is: Quality,
            alias: 'quality',
            props: {source: this.source, player: this.player, episode: this.episode}
          },
          {
            is: Speed,
            alias: 'speed',
            props: {player: this.player},
            events: {'update:speed': $event => this.$emit('update:speed', $event)}
          }
        ]
      },


      /**
       * Get active handler
       *
       * @return {*}
       */
      handler() {
        return this.settings.find(item => item.alias === this.component);
      }

    },


    watch: {
      is_visible: {
        handler(is_visible) {
          if (is_visible === true) this.component = 'selector';
        }
      },

      component: {
        handler() {

          console.log(this.$refs.settings)
        }
      }
    }

  }
</script>

<style lang="scss" scoped>

  .video__settings__items {
    ::v-deep {
      .v-list-item {
        height: 32px;
        min-height: auto;
      }
    }
  }
</style>
