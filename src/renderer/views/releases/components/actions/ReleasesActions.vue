<template>
  <v-layout class="shrink">

    <v-btn v-bind="{loading}" :disabled="loading" @click="$emit('toEpisode')">Смотреть</v-btn>
    <v-btn v-bind="{loading}" class="ml-1" :disabled="loading" @click="$emit('toRelease')">Релиз</v-btn>

  </v-layout>
</template>

<script>

  const props = {
    loading: {
      type: Boolean,
      default: false
    }
  };
  export default {
    props,
  }
</script>
