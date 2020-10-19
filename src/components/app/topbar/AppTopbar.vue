<template>
  <v-layout
    v-if="this.isDesktop && !this.isOnFullscreen"
    align-center
    class="black system-bar white--text px-2"
    @dblclick="maximizeApp">

    <template v-if="!this.isMac">
      <v-spacer v-if="this.isWindows"/>
      <template v-for="(control, k) in controls">
        <v-btn icon small class="system-bar__button" :key="k" @click="control.action">
          <v-icon small color="grey">{{control.icon}}</v-icon>
        </v-btn>
      </template>
    </template>

  </v-layout>
</template>

<script>

  // Mixins
  import {PlatformMixin, DeviceMixin, FullscreenMixin} from '@mixins/app'

  // Utils
  import {runOnDesktop} from "@@/utils/resolvers/system/deviceResolver";

  export default {
    mixins: [
      DeviceMixin,
      PlatformMixin,
      FullscreenMixin
    ],
    computed: {


      /**
       * Get controls
       *
       * @return Array
       */
      controls() {
        return [
          {
            icon: 'mdi-minus',
            sort: this.isWindows ? 0 : 1,
            action: () => this.minimizeApp(),
          },
          {
            icon: 'mdi-window-maximize',
            action: () => this.maximizeApp(),
            sort: this.isWindows ? 1 : 2
          },
          {
            icon: 'mdi-close',
            action: () => this.closeApp(),
            sort: this.isWindows ? 2 : 0
          },
        ].sort((a, b) => a.sort - b.sort)
      }

    },

    methods: {

      /**
       * Close app
       *
       * @return void
       */
      closeApp() {
        runOnDesktop(() => this.$electron.remote.app.quit())
      },

      /**
       * Minimize app
       *
       * @return void
       */
      minimizeApp() {
        runOnDesktop(() => this.$electron.remote.getCurrentWindow().minimize())
      },


      /**
       * Maximize app
       *
       * @return void
       */
      maximizeApp() {
        runOnDesktop(() => {
          const window = this.$electron.remote.getCurrentWindow();
          window.isMaximized() ? window.unmaximize() : window.maximize();
        })
      }
    }

  }
</script>

<style lang="scss" scoped>

  .system-bar {
    top: 0;
    height: 40px;
    width: 100%;
    z-index: 10;
    position: fixed;
    -webkit-app-region: drag;

    &__button {
      -webkit-app-region: no-drag;
    }

    &.is-mac--fullscreen {
      display: none;
    }
  }

</style>
