<template>
  <v-tooltip left>
    <template v-slot:activator="{on}">
      <v-btn v-on="on" icon large @click="episodesDrawer ? episodesDrawer.show() : ''">
        <v-icon size="24">mdi-playlist-play</v-icon>
      </v-btn>
    </template>
    <span>Эпизоды</span>
  </v-tooltip>
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
      episodesDrawer() {
        return this.$__get(this.$interface, '$refs.episodes.0')
      }
    }
  }
</script>
