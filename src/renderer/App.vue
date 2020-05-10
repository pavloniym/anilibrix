<template>
  <v-app>

    <!-- System Bar -->
    <app-system-bar/>

    <v-fade-transition mode="out-in" appear>

      <!-- Loader -->
      <app-loader v-if="loading"/>

      <!-- Content -->
      <template v-else>
        <v-fade-transition mode="out-in" appear>
          <router-view :key="$route.fullPath"/>
        </v-fade-transition>
      </template>
    </v-fade-transition>

    <!-- System components -->
    <app-errors/>
    <app-notifications/>

  </v-app>
</template>

<script>

  import AppLoader from '@components/app/loader'
  import AppErrors from '@components/app/errors'
  import AppSystemBar from "@components/app/bars/system";
  import AppNotifications from '@components/app/notifications/system'

  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'AniLibrix',
    components: {
      AppErrors,
      AppLoader,
      AppSystemBar,
      AppNotifications
    },
    data() {
      return {
        loading: false,
        update: {
          handler: null
        }
      }
    },


    computed: {
      ...mapState('app/settings/system', {
        _updates: s => s.updates.enabled,
        _timeout: s => (s.updates.timeout || 1) * 60 * 1000
      })

    },

    methods: {
      ...mapActions('releases', {_getReleases: 'getReleases'}),


      /**
       * Toggle releases updates
       *
       * @return void
       */
      toggleUpdates() {

        // Clear update interval
        if (this.update.handler) {
          clearInterval(this.update.handler);
          this.update.handler = null;
        }

        if (this._updates === true) {
          this.update.handler = setInterval(() => this._getReleases(), this._timeout);
        }
      }

    },

    created() {

      // Initial loading
      this.loading = true;
      setTimeout(() => this.loading = false, 500);


      // Get latest releases
      this._getReleases();


      // Get watch data
      /*this.$store
        .dispatchPromise('firebase/watch/getWatchData')
        .catch(() => this.$toasted.error('Произошла ошибка при синхронизации данных с облаком'));*/
    },


    watch: {

      _updates: {
        immediate: true,
        handler() {
          this.toggleUpdates();
        }
      },

      _timeout: {
        handler() {
          this.toggleUpdates();
        }
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
