<template>
  <v-card flat color="transparent">

    <v-card-title
      v-text="release.names.ru"
      class="display-2 mb-4 font-weight-black"
      :style="{wordBreak: 'break-word'}">
    </v-card-title>

    <v-card-subtitle v-text="release.names.original" class="pb-0"/>
    <v-card-subtitle v-text="release.genres.join(' | ')" class="pt-0"/>

    <v-card-text class="pb-0">
      <v-chip label class="mb-1">{{release.year}}</v-chip>
      <v-chip label class="mb-1">{{release.type}}</v-chip>
      <div class="pt-4 white--text">{{release.description}}</div>
    </v-card-text>

  </v-card>
</template>

<script>

  import {mapState} from "vuex";

  export default {
    computed: {
      ...mapState('release', {
        release: s => s.data,
      })
    }
  }
</script>
