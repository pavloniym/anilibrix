<template>
  <v-app-bar app flat color="transparent" class="px-4">

    <v-spacer/>

    <!-- Search -->
    <v-btn icon class="mr-1">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>


    <!-- Settings -->
    <v-btn icon @click="openSettingsDrawer">
      <v-icon>mdi-settings</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>

  import { mapActions } from 'vuex';

  export default {
    name: 'AppToolbar',
    methods: {
      ...mapActions('settings', {
        _setDrawer: 'setDrawer',
      }),

      openSettingsDrawer() {
        console.log('test');
        this._setDrawer(true);
      },

    },
  };
</script>

<style scoped>

</style>
