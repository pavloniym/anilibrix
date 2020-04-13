<template>
  <v-system-bar v-bind="{color}" window class="system-bar px-6">

    <v-spacer v-if="isWindows"/>

    <template v-for="(control, k) in controls">
      <v-btn small icon color="grey darken-2" :key="k" @click="control.action">
        <v-icon small class="mr-0">{{control.icon}}</v-icon>
      </v-btn>
    </template>

  </v-system-bar>
</template>

<script>

  import {remote} from 'electron'

  const props = {
    color: {
      type: String,
      default: null
    }
  };

  export default {
    props,
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
       * Get controls
       *
       * @return Array
       */
      controls() {
        return [

          {icon: 'mdi-minus', action: () => this.minimizeApp(), sort: this.isWindows ? 0 : 1},
          {icon: 'mdi-window-maximize', action: () => this.maximizeApp(), sort: this.isWindows ? 1 : 2},
          {icon: 'mdi-close', action: () => this.closeApp(), sort: this.isWindows ? 2 : 0},

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
    -webkit-app-region: drag;
  }

</style>
