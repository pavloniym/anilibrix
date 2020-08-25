<template>
  <v-navigation-drawer v-model="drawer" app right fixed temporary width="400" class="settings">

    <!-- Header -->
    <v-toolbar flat class="shrink" color="#363636">
      <v-toolbar-title class="body-1">Настройки приложения</v-toolbar-title>
    </v-toolbar>
    <v-divider/>

    <!-- Settings -->
    <!-- Credentials -->
    <app-settings />
    <app-settings-credentials class="py-4" />

  </v-navigation-drawer>
</template>

<script>

  // Components
  import AppSettings from './AppSettings'
  import AppSettingsCredentials from './AppSettingsCredentials'

  // Mixins
  import {PlatformMixin} from '@mixins/app'

  // Store
  import {mapState, mapActions} from 'vuex'

  export default {
    mixins: [PlatformMixin],
    components: {
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
<style lang="scss" scoped>

  .settings {
    ::v-deep {
      .v-navigation-drawer__content {
        overflow-y: scroll;
      }
    }

    ::-webkit-scrollbar-thumb {
      background-color: black;
    }

    ::-webkit-scrollbar {
      background-color: transparent;
    }
  }

</style>
