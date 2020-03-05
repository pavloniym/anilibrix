<template>
  <v-layout fill-height column>

    <!-- Settings -->
    <app-settings/>

    <!-- Toolbar -->
    <app-toolbar no-search no-update>
      <template v-slot:right>

        <!-- Return to releases page -->
        <v-btn icon @click="$router.push({name: 'releases'})">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

      </template>
    </app-toolbar>

    <!-- Content -->
    <v-content :style="{overflowY: 'scroll', height: '100vh'}">
      <slot/>
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
