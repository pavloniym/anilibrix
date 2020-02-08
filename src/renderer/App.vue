<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'anilibria-theater',
    methods: {
      ...mapActions('releases', ['getLatestReleases'])
    },

    created() {
      this.getLatestReleases();
    }
  }
</script>


<style lang="scss">

  html, body {
    overflow-y: hidden !important;
  }

</style>
