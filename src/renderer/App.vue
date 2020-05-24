<template>
  <v-app>

    <!-- System bar -->
    <app-system-bar />

    <v-fade-transition mode="out-in" appear>
      <app-loader v-if="loading"/>
      <div v-else id="container" class="fill-height">
        <v-fade-transition mode="out-in" appear>
          <router-view :key="$route.name"/>
        </v-fade-transition>
      </div>
    </v-fade-transition>

    <!-- Errors -->
    <app-errors/>

  </v-app>
</template>

<script>

  import AppLoader from '@components/app/loader'
  import AppErrors from '@components/app/errors'
  import AppSystemBar from '@components/app/systembar'

  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'AniLibrix',
    components: {
      AppErrors,
      AppLoader,
      AppSystemBar,
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
