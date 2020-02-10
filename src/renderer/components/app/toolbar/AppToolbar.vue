<template>
  <v-app-bar app flat color="transparent" class="px-4">

    <v-spacer/>

    <!-- Search -->
    <v-btn icon class="mr-1" disabled>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>


    <!-- Settings -->
    <v-btn icon @click="_setDrawer(true)">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
  import { mapActions } from 'vuex'

export default {
    name: 'AppToolbar',
    methods: {
      ...mapActions('settings', {
        _setDrawer: 'setDrawer'
      })
    }
  }
</script>

<style scoped>

</style>
