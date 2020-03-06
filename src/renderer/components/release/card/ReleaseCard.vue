<template>
  <v-layout>
    <div :style="{width: '5%'}"></div>
    <div class="d-flex" :style="{width: '90%'}">
      <v-card
        height="450"
        width="315"
        class="black"
        :style="{position: 'sticky', top: 0}">

        <v-img
          v-if="poster"
          width="315"
          class="black"
          height="450"
          max-width="315"
          max-height="450"
          :src="poster">
        </v-img>

      </v-card>

      <v-card
        flat
        class="ml-4"
        color="transparent"
        :style="{width: '100%'}">

        <v-card-title v-text="release.names.ru" class="pt-0"/>
        <v-card-subtitle v-text="release.names.original" class="pb-0"/>
        <v-card-subtitle v-text="release.genres.join(' | ')" class="pt-0"/>
        <v-card-text>
          <v-chip label class="mb-1">{{release.year}}</v-chip>
          <v-chip label class="mb-1">{{release.type}}</v-chip>
          <div class="pt-4">{{release.description}}</div>
        </v-card-text>
      </v-card>
    </div>
    <div :style="{width: '5%'}"></div>
  </v-layout>
</template>

<script>
  const props = {
    release: {
      type: Object,
      default: null
    },
    poster: {
      type: String,
      default: null
    }
  };

  export default {
    props,
  }
</script>
