<template>
  <v-btn icon large @click="drawer ? drawer.show() : ''">
    <v-icon size="24">mdi-playlist-play</v-icon>
  </v-btn>
</template>

<script>
  export default {
    inject: ['$interface'],
    computed: {

      /**
       * Get episodes drawer ref from interface
       *
       * @return {*}
       */
      drawer() {
        return this.$__get(this.$interface, '$refs.episodes.0')
      }
    }
  }
</script>
