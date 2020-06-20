<template>
  <v-layout
    align-center
    class="black system-bar white--text px-2"
    :class="{'is-mac--fullscreen': this.isMacOnFullscreen}"
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

  import {AppPlatformMixin} from '@mixins/app'

  export default {
    mixins: [AppPlatformMixin],
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
        this.$electron.remote.app.quit();
      },

      /**
       * Minimize app
       *
       * @return void
       */
      minimizeApp() {
        this.$electron.remote.getCurrentWindow().minimize();
      },


      /**
       * Maximize app
       *
       * @return void
       */
      maximizeApp() {

        const window = this.$electron.remote.getCurrentWindow();

        window.isMaximized()
          ? window.unmaximize()
          : window.maximize();
      }
    }

  }
</script>

<style lang="scss" scoped>

  .system-bar {
    z-index: 5;
    height: 40px;
    -webkit-app-region: drag;

    &__button {
      -webkit-app-region: no-drag;
    }

    &.is-mac--fullscreen {
      display: none;
    }
  }

</style>
