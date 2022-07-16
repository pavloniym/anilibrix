<template>
  <v-app>
    <!-- System Bar -->
    <app-system-bar/>
    <app-settings/>

    <!-- Content -->
    <v-fade-transition mode="out-in" appear>
      <app-loader v-if="loading"/>
      <template v-else>
        <v-fade-transition mode="out-in" appear>
          <component :is="layout">
            <router-view :key="$route.fullPath"/>
          </component>
        </v-fade-transition>
      </template>
    </v-fade-transition>

    <!-- Errors -->
    <!-- Downloads -->
    <!-- Notifications -->
    <app-errors/>
    <app-downloads/>
    <app-notifications/>

  </v-app>
</template>

<script>

  import AppLoader from '@components/app/loader'
  import AppErrors from '@components/app/errors'
  import AppToolBar from "@components/app/toolbar";
  import AppSettings from "@components/app/settings";
  import AppSystemBar from '@components/app/systembar'
  import AppDownloads from "@components/app/downloads";
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
      ...mapState('app', {_welcome_view: s => s.welcome_view}),
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
      },


      /**
       * Get current route name
       *
       * @return {string|null}
       */
      view() {
        return this.$route.name || null;
      },

    },


    methods: {
      ...mapActions('app', {_setWelcomeView: 'setWelcomeView'}),
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

      // Push to saved welcome view
      if (this._welcome_view !== null && this.view !== this._welcome_view) {
        this.$router.push({name: this._welcome_view});
      }

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
      },


      view: {
        handler(view) {
          if (['releases', 'catalog', 'favorites'].includes(view)) this._setWelcomeView(view);
        }
      }

    }

  }
</script>
