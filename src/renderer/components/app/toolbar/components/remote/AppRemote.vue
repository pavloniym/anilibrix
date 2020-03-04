<template>
  <v-layout>
    <!-- Close -->
    <v-btn icon small class="mr-1" @click="closeApp">
      <v-icon small>mdi-close</v-icon>
    </v-btn>

    <!-- Minimize -->
    <v-btn icon small class="mr-1" @click="minimizeApp">
      <v-icon small>mdi-window-minimize</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>

  import {remote} from 'electron'

  export default {
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
    }
  }
</script>
