<template>
  <v-app>

    <v-fade-transition mode="out-in" appear>
      <app-loader v-if="loading"/>
      <div v-else id="container" class="fill-height">
        <v-fade-transition mode="out-in" appear>
          <router-view :key="$route.name"/>
        </v-fade-transition>
      </div>
    </v-fade-transition>

    <app-errors/>

  </v-app>
</template>

<script>

  import AppLoader from '@components/app/loader'
  import AppErrors from '@components/app/errors'

  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'AniLibrix',
    components: {
      AppErrors,
      AppLoader,
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
      ...mapActions('app/watch', {_getWatchData: 'getWatchData'}),


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
      // Get watch data
      this._getReleases();
      this._getWatchData();
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
