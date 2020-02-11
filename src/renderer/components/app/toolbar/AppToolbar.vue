<template>
  <v-app-bar app flat color="transparent" class="px-4">

    <v-spacer/>

    <!-- Search -->
    <v-btn icon class="mr-1" disabled>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <!-- Reload -->
    <v-btn icon class="mr-1" :disabled="loading" @click="getLatestReleases">
      <v-icon v-if="!loading">mdi-refresh</v-icon>
      <v-progress-circular v-if="loading" indeterminate size="20" />
    </v-btn>


    <!-- Settings -->
    <v-btn icon @click="setDrawer(true)">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'AppToolbar',
    computed: {
      ...mapState('releases', ['loading'])
    },
    methods: {
      ...mapActions('settings', ['setDrawer']),
      ...mapActions('releases', ['getLatestReleases']),
    }
  }
</script>

<style scoped>

</style>
