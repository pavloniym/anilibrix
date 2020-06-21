<template>
  <v-app>

    <!-- System Bar -->
    <app-system-bar/>
    <app-settings/>

    <!-- Content -->
    <v-fade-transition mode="out-in" appear>
      <app-loader v-if="loading"/>
      <app-base-layout v-else>

        <!-- App Toolbar -->
        <app-tool-bar key="toolbar"/>

        <!-- Router View -->
        <v-fade-transition mode="out-in">
          <router-view :key="$route.name"/>
        </v-fade-transition>

      </app-base-layout>
    </v-fade-transition>


    <!-- Errors -->
    <!-- App Settings -->
    <!-- Notifications -->
    <app-errors/>
    <app-notifications/>


  </v-app>
</template>

<script>

  import AppLoader from '@components/app/loader'
  import AppErrors from '@components/app/errors'
  import AppToolBar from "@components/app/toolbar";
  import AppSettings from "@components/app/settings";
  import AppSystemBar from '@components/app/systembar'
  import AppBaseLayout from '@layouts/base'
  import AppNotifications from "@components/app/notifications";

  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'AniLibrix',
    components: {
      AppLoader,
      AppErrors,
      AppToolBar,
      AppSettings,
      AppSystemBar,
      AppBaseLayout,
      AppNotifications,
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
        _timeout: s => (s.updates.timeout > 0 ? s.updates.timeout : 1) * 60 * 1000
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
