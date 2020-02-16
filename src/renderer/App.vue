<template>
  <v-app>

    <v-fade-transition mode="out-in" appear>
      <!-- Loader -->
      <template v-if="loading">
        <loader/>
      </template>

      <!-- Content -->
      <template v-else>
        <v-fade-transition mode="out-in" appear>
          <router-view/>
        </v-fade-transition>
      </template>
    </v-fade-transition>

    <!-- Errors Toasts -->
    <errors/>

  </v-app>
</template>

<script>

  import Loader from '@components/app/loader'
  import Errors from '@components/app/errors'

  import {mapActions} from 'vuex'

  export default {
    name: 'Anilibria',
    components: {Errors, Loader},
    data() {
      return {
        loading: false
      }
    },

    methods: {
      ...mapActions('releases', ['getLatestReleases']),
    },

    created() {
      this.loading = true;
      this.$store.dispatchPromise('releases/getLatestReleases')
        .finally(() => this.loading = false)
    }
  }
</script>


<style lang="scss">

  html, body {
    overflow-y: hidden !important;
  }

</style>
