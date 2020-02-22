<template>
  <v-app-bar app flat color="transparent" class="toolbar px-4">

    <!-- Close -->
    <v-btn icon small class="mr-1" @click="closeApp">
      <v-icon small>mdi-close</v-icon>
    </v-btn>

    <!-- Minimize -->
    <v-btn icon small class="mr-1" @click="minimizeApp">
      <v-icon small>mdi-window-minimize</v-icon>
    </v-btn>


    <v-spacer/>

    <!-- Search -->
    <v-btn icon class="mr-1" disabled>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <!-- Reload -->
    <v-btn icon class="mr-1" :disabled="loading" @click="getLatestReleases">
      <v-icon v-if="!loading">mdi-refresh</v-icon>
      <v-progress-circular v-if="loading" indeterminate size="20"/>
    </v-btn>


    <!-- Settings -->
    <v-btn icon @click="setDrawer(!drawer)">
      <v-icon>mdi-{{drawer ? 'chevron-right' : 'menu'}}</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>

  import {remote} from 'electron'
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'AppToolbar',
    computed: {
      ...mapState('releases', ['loading']),
      ...mapState('settings', ['drawer'])
    },
    methods: {
      ...mapActions('settings', ['setDrawer']),
      ...mapActions('releases', ['getLatestReleases']),


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

<style scoped lang="scss">

  .toolbar {
    z-index: 100 !important;
    -webkit-app-region: drag !important;
  }

</style>
