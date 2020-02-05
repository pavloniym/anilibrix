<template>
  <v-app>

    <!-- Settings -->
    <app-settings/>

    <!-- Toolbar -->
    <app-toolbar/>


    <!-- Content -->
    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
  import AppToolbar from '@components/app/toolbar'
import AppSettings from '@components/app/settings'

export default {
    name: 'anilibria-theater',
    components: {
      AppToolbar,
      AppSettings
    }
  }
</script>


<style lang="scss">

  html, body {
    overflow-y: hidden !important;
  }

</style>
