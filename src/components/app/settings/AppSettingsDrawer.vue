<template>
  <drawer v-model="drawer" app right fixed temporary width="400">

    <!-- Header -->
    <v-toolbar flat class="shrink" color="#363636">
      <v-toolbar-title class="body-1">Настройки приложения</v-toolbar-title>
    </v-toolbar>
    <v-divider/>

    <!-- Settings -->
    <!-- Credentials -->
    <app-settings />
    <app-settings-credentials class="py-4" />

  </drawer>
</template>

<script>

  // Components
  import Drawer from './../ui/drawer'
  import AppSettings from './AppSettings'
  import AppSettingsCredentials from './AppSettingsCredentials'

  // Mixins
  import {PlatformMixin} from '@mixins/app'

  // Store
  import {mapState, mapActions} from 'vuex'

  export default {
    mixins: [PlatformMixin],
    components: {
      Drawer,
      AppSettings,
      AppSettingsCredentials
    },
    computed: {
      ...mapState('app', {_drawer: s => s.drawer}),

      drawer: {

        /**
         * Get drawer state
         *
         * @return boolean
         */
        get() {
          return !!this._drawer;
        },

        /**
         * Set drawer state
         *
         * @param state
         * @return void
         */
        set(state) {
          this._setDrawer(state);
        }
      }

    },

    methods: {
      ...mapActions('app', {_setDrawer: 'setDrawer'}),
    }

  }
</script>
