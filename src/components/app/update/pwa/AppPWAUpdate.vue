<template>
  <v-snackbar v-if="isWeb" v-model="is_visible" app top right multi-line :timeout="300000">
    <span>Доступна новая версия приложения</span>
    <v-btn text :loading="is_visible" @click="applyServiceWorker">Обновить</v-btn>
  </v-snackbar>
</template>

<script>

  // Mixins
  import {DeviceMixin} from "@mixins/app";

  export default {
    mixins: [DeviceMixin],
    data() {
      return {
        is_visible: false,
        is_activating: false,
        is_refreshing: false,
        service_worker: null,
      }
    },

    methods: {

      /**
       * Update app
       * Hard reload
       *
       * @return void
       */
      applyServiceWorker() {
        if (this.service_worker) {
          this.service_worker.postMessage({type: 'SKIP_WAITING'});
        }
      },


      /**
       * Resolve worker state
       *
       * @param e
       * @return void
       */
      resolveState(e) {

        const state = e.target.state;

        // Make snackbar visible
        // Service worker is installing
        if (state === 'installed') {
          this.is_visible = true;
        }

        // Service worker is activating
        if (state === 'activating') {
          this.is_activating = true;
        }

        // If service worker is activated and page is not refreshing
        // Avoid cycle
        if (state === 'activated' && this.is_refreshing === false) {

          // Set refreshing state
          this.is_refreshing = true;

          // Reload page to activate new service worker
          window.location.reload();
        }

      },
    },


    mounted() {
      if (this.isWeb) {
        if (window.navigator && navigator.serviceWorker) {

          // Check for new service-worker update available
          // If available -> show snackbar
          navigator.serviceWorker
            .getRegistration()
            .then(registration => {
              if (registration) {
                registration.addEventListener('updatefound', () => {
                  this.service_worker = registration.installing
                });
              }
            });


          // Detect service worker change
          // Check that page is not already refreshing
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (this.is_refreshing === false) {

              // Set refreshing state
              this.is_refreshing = true;

              // Reload page to activate new service worker
              window.location.reload();
            }
          });

        }
      }
    },

    watch: {
      service_worker: {
        deep: true,
        handler(service_worker, previous) {
          if (this.isWeb) {

            // Install event
            // Show snackbar
            if (service_worker) {
              service_worker.addEventListener('statechange', this.resolveState, true);
            }

            // Remove event listener from previous service worker
            if (previous) {
              previous.removeEventListener('statechange', this.resolveState);
            }

          }
        }
      }
    },


    destroyed() {
      if (this.isWeb) {
        if (this.service_worker) {
          this.service_worker.removeEventListener('statechange', this.resolveState);
        }
      }
    }


  }
</script>
