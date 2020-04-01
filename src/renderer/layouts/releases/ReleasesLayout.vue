<template>
  <v-layout fill-height column>

    <!-- Toolbar -->
    <app-toolbar/>

    <!-- Settings -->
    <app-settings/>


    <!-- Content -->
    <v-content>
      <slot />
    </v-content>


  </v-layout>
</template>

<script>

  import AppToolbar from '@components/app/toolbar'
  import AppSettings from '@components/app/settings'

  export default {
    components: {
      AppToolbar, AppSettings
    }
  }
</script>
