<template>
  <v-app>

    <!-- Settings -->
    <!-- System Bar -->
    <app-topbar/>
    <app-settings/>
    <app-pwa-update/>

    <!-- Loader -->
    <!-- Content -->
    <app-loader v-if="is_loading" key="loader"/>
    <component v-else :is="layout">
      <router-view :key="$route.name"/>
    </component>


    <!-- Errors -->
    <!-- Notifications -->
    <app-error/>
    <app-notifications/>

  </v-app>
</template>

<script>

  // App
  import AppError from '@components/app/error'
  import AppLoader from '@components/app/loader'
  import AppTopbar from '@components/app/topbar'
  import AppSettings from "@components/app/settings";
  import AppNotifications from "@components/app/notifications";

  // Components
  import {AppPwaUpdate} from '@components/app/update'

  // Layouts
  import AppBaseLayout from '@layouts/base'

  // Utils
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'AniLibrix',
    components: {
      AppError,
      AppLoader,
      AppTopbar,
      AppSettings,
      AppPwaUpdate,
      AppBaseLayout,
      AppNotifications,
    },
    data() {
      return {
        is_loading: false,
        update_handler: null
      }
    },


    computed: {
      ...mapState('app/settings', {
        _releases_updates_timeout: s => s.app.releases_updates.timeout,
        _releases_updates_are_enabled: s => s.app.releases_updates.is_enabled,
      }),

      /**
       * Get route layout
       *
       * @return {{}}
       */
      layout() {
        return this.$__get(this.$route, 'meta.layout.is', AppBaseLayout);
      },


      /**
       * Releases updates configuration
       *
       * @return {*}
       */
      releasesUpdates() {
        return {
          releases_updates_timeout: (this._releases_updates_timeout > 0 ? this._releases_updates_timeout : 1) * 60 * 1000,
          releases_updates_are_enabled: this._releases_updates_are_enabled
        }
      }

    },


    methods: {
      ...mapActions('releases', {_getReleases: 'getReleases'}),
      ...mapActions('favorites', {_getFavorites: 'getFavorites'}),


      /**
       * Refresh data
       * Get releases
       * Get favorites
       *
       * @return {void}
       */
      refreshData() {
        this._getReleases();
        this._getFavorites();
      },


      /**
       * Toggle releases updates
       *
       * @return void
       */
      toggleUpdates() {

        // Clear update interval
        if (this.update_handler) clearInterval(this.update_handler);

        // If updated are enabled -> set interval for auto updates
        if (this.releasesUpdates.releases_updates_are_enabled === true) {
          this.update_handler = setInterval(this.refreshData, this.releasesUpdates.releases_updates_timeout);
        }
      }

    },

    created() {

      // Initial loading
      // Add some delay for loader
      this.is_loading = true;
      setTimeout(() => this.is_loading = false, 1000);

      // Get releases
      // Get favorites
      this.refreshData();

    },


    watch: {
      releasesUpdates: {
        deep: true,
        immediate: true,
        handler() {
          this.toggleUpdates();
        }
      }
    }

  }
</script>
