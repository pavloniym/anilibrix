<template>
  <v-app>
    <errors-toasts/>
    <router-view/>
  </v-app>
</template>

<script>

  import ErrorsToasts from '@components/app/errors-toasts'

  import {mapActions} from 'vuex'

  export default {
    name: 'Anilibria',
    components: {ErrorsToasts},
    methods: {
      ...mapActions('releases', ['getLatestReleases']),
    },

    created() {
      this.getLatestReleases();
    },
  }
</script>


<style lang="scss">

  html, body {
    overflow-y: hidden !important;
  }

</style>
