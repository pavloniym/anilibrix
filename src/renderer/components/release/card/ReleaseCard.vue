<template>

  <!-- Loading -->
  <div v-if="loading" class="ma-4">
    <v-skeleton-loader boilerplate type="heading" height="50" width="70%"/>
    <v-skeleton-loader boilerplate type="text" class="mt-6" width="140"/>
    <v-skeleton-loader boilerplate type="text" class="mt-1" width="260"/>
    <v-layout class="mt-2">
      <v-skeleton-loader boilerplate type="button" width="65" class="mr-1"/>
      <v-skeleton-loader boilerplate type="button" width="160"/>
    </v-layout>
    <v-skeleton-loader boilerplate type="text@10" class="mt-6"/>
  </div>

  <!-- Data -->
  <v-card v-else-if="loading === false && release" flat color="transparent">

    <!-- Title -->
    <v-card-title
      v-text="release.names.ru"
      class="display-2 mb-4 font-weight-black"
      :style="{wordBreak: 'break-word'}">
    </v-card-title>

    <!-- Original Name + Genres -->
    <v-card-subtitle v-text="release.names.original" class="pb-0"/>
    <v-card-subtitle v-text="release.genres.join(' | ')" class="pt-0"/>

    <!-- Meta + Description -->
    <v-card-text class="pb-0">
      <v-chip label class="mb-1">{{release.year}}</v-chip>
      <v-chip label class="mb-1">{{release.type}}</v-chip>
      <div class="pt-4 white--text">{{release.description}}</div>
    </v-card-text>

  </v-card>
</template>

<script>

  const props = {
    loading: {
      type: Boolean,
      default: false
    },
    release: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
  }
</script>
