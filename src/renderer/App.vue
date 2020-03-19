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

    <!-- System notifications -->
    <notifications/>

  </v-app>
</template>

<script>

  import Loader from '@components/app/loader'
  import Errors from '@components/app/errors'
  import Notifications from '@components/app/notifications/system'

  import {mapActions} from 'vuex'

  export default {
    name: 'Anilibria',
    components: {
      Errors,
      Loader,
      Notifications
    },
    data() {
      return {
        loading: false,
        update: {
          handler: null,
          timeout: 1000 * 60 * 10 // every 10 minutes
        }
      }
    },

    methods: {
      ...mapActions('releases', ['getLatestReleases']),
    },

    created() {

      // Initial loading
      this.loading = true;
      this.$store.dispatchPromise('releases/getLatestReleases')
        .finally(() => this.loading = false);


      // Set update interval
      this.update.handler = setInterval(() => this.getLatestReleases(), this.update.timeout);

    },


    destroyed() {

      // Clear update interval
      if (this.update.handler) {
        clearInterval(this.update.interval);
      }
    }

  }
</script>


<style lang="scss">

  html, body {
    overflow-y: hidden !important;

    ::-webkit-scrollbar-thumb {
      background-color: #505050;
    }

    ::-webkit-scrollbar {
      width: 9px;
      background-color: #bfbfbf;
    }

  }

</style>
