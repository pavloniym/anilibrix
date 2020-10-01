<template>
  <loader v-if="loading"/>
  <v-layout v-else class="shrink">

    <!-- Show video -->
    <!-- Show release -->
    <v-btn class="mr-1" @click="$emit('action:video')">Смотреть</v-btn>
    <v-btn class="mr-1" @click="$emit('action:release')">Релиз</v-btn>

  </v-layout>
</template>

<script>

  // Loader
  import Loader from './components/loader'

  const props = {
    loading: {
      type: Boolean,
      default: false
    },
  };

  export default {
    props,
    components: {
      Loader,
    },
  }
</script>
