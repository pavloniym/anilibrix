<template>
  <v-app>

    <!-- System Bar -->
    <app-system-bar/>
    <app-settings/>

    <!-- Content -->
    <v-fade-transition mode="out-in" appear>
      <app-loader v-if="loading" key="loader"/>
      <component v-else :is="layout" :key="$route.name">
        <router-view :key="$route.name"/>
      </component>
    </v-fade-transition>

    <!-- Errors -->
    <!-- Downloads -->
    <!-- Notifications -->
    <app-errors/>
    <!--<app-downloads/>-->
    <app-notifications/>

  </v-app>
</template>

<script>

  // Components
  import AppLoader from '@components/app/loader'
  import AppErrors from '@components/app/errors'
  import AppToolBar from "@components/app/toolbar";
  import AppSettings from "@components/app/settings";
  import AppSystemBar from '@components/app/systembar'
  import AppDownloads from "@components/app/downloads";
  import AppBaseLayout from '@layouts/base'
  import AppNotifications from "@components/app/notifications";

  // Utils
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'AniLibrix',
    components: {
      AppLoader,
      AppErrors,
      AppToolBar,
      AppSettings,
      AppSystemBar,
      AppDownloads,
      AppBaseLayout,
      AppNotifications,
    },
    data() {
      return {
        loading: false,
        update_handler: null
      }
    },


    computed: {
      ...mapState('app/settings/system', {
        _updates_enabled: s => s.updates.enabled,
        _updates_timeout: s => (s.updates.timeout > 0 ? s.updates.timeout : 1) * 60 * 1000
      }),

      /**
       * Get route layout
       *
       * @return {{}}
       */
      layout() {
        return this.$__get(this.$route, 'meta.layout.is', AppBaseLayout);
      }

    },


    methods: {
      ...mapActions('releases', {_getReleases: 'getReleases'}),
      ...mapActions('favorites', {_getFavorites: 'getFavorites'}),


      /**
       * Toggle releases updates
       *
       * @return void
       */
      toggleUpdates() {

        // Clear update interval
        if (this.update_handler) clearInterval(this.update_handler);

        // If updated are enabled -> set interval for auto updates
        if (this._updates_enabled === true) {
          this.update_handler = setInterval(() => {

            this._getReleases();
            this._getFavorites();

          }, this._updates_timeout);
        }
      }

    },

    created() {

      // Initial loading
      this.loading = true;
      setTimeout(() => this.loading = false, 1000);

      // Get releases
      // Get favorites
      this._getReleases();
      this._getFavorites();


      console.log(process.env.IS_WEB);
      
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
