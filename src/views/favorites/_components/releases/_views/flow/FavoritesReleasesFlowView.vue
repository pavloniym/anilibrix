<template>
  <v-row dense>
    <template v-for="release in releases">

      <v-col cols="3" lg="2" :key="release.id">
        <release v-bind="{release}" @click="toRelease(release.id)"/>
      </v-col>

    </template>
  </v-row>
</template>

<script>

  // Components
  import Release from './../../_components/release'

  // Routes
  import {toRelease} from "@router/release/releaseRoutes";

  const props = {
    releases: {
      type: Array,
      default: null
    }
  };

  export default {
    props,
    components: {Release},
    methods: {
      ...{toRelease}
    }
  }
</script>
