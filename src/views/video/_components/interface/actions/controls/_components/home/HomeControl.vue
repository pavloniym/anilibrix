<template>
  <v-tooltip right>
    <template v-slot:activator="{on}">
      <v-btn v-on="on" icon large @click="toReleases">
        <v-icon size="24">mdi-view-column</v-icon>
      </v-btn>
    </template>
    <span>Релизы</span>
  </v-tooltip>
</template>

<script>

  // Routes
  import {toReleases} from "@router/releases/releasesRoutes";

  export default {
    methods: {
      ...{toReleases}
    }
  }
</script>
