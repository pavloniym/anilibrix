<template>
  <v-layout
    align-center
    class="black system-bar white--text px-2"
    :style="{height: '40px'}"
    @dblclick="maximizeApp">

    <template v-if="isMac === false">
      <v-spacer v-if="isWindows"/>
      <template v-for="(control, k) in controls">
        <v-btn icon small class="system-bar__button" :key="k" @click="control.action">
          <v-icon small color="grey">{{control.icon}}</v-icon>
        </v-btn>
      </template>
    </template>

  </v-layout>
</template>

<script>

  import {remote} from 'electron'

  export default {
    computed: {

      /**
       * Check if is windows platform
       *
       * @return Boolean
       */
      isWindows() {
        return !!(process.platform === "win32" || process.platform === "win64");
      },


      /**
       * Check if is mac platform
       *
       * @return {boolean}
       */
      isMac() {
        return process.platform === "darwin";
      },


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
        remote.app.quit();
      },

      /**
       * Minimize app
       *
       * @return void
       */
      minimizeApp() {
        remote.getCurrentWindow().minimize();
      },


      /**
       * Maximize app
       *
       * @return void
       */
      maximizeApp() {
        const window = remote.getCurrentWindow();

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
    -webkit-app-region: drag;

    &__button {
      -webkit-app-region: no-drag;
    }
  }

</style>
