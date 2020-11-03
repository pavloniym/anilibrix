<template>
  <div>

    <v-tooltip left activator="#toolbar__search">
      <div>Поиск</div>
    </v-tooltip>

    <v-btn icon id="toolbar__search" @click="toSearch">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

  </div>
</template>

<script>

  // Routes
  import {toSearch} from "@router/app/search/appSearchRoutes";

  export default {
    methods: {
      ...{toSearch},

    }
  }
</script>
