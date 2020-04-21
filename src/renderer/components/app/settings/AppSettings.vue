<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    right
    fixed
    temporary
    width="400"
    class="settings">


    <!-- Header -->
    <v-toolbar flat class="shrink" color="#363636">
      <v-app-bar-nav-icon @click="drawer = false">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="body-1">Настройки приложения</v-toolbar-title>
    </v-toolbar>
    <v-divider />


    <!-- Categories -->
    <component v-for="(category, k) in categories" class="mb-2" :is="category" :key="k"/>


    <!-- Credentials -->
    <credentials />


  </v-navigation-drawer>
</template>

<script>

  import Credentials from './components/credentials'

  import AppSettings from './categories/app'
  import PlayerSettings from './categories/player'
  import SystemSettings from './categories/system'
  import ConnectionSettings from './categories/connection'

  import {mapState, mapActions} from 'vuex'

  export default {
    components: {
      Credentials
    },
    computed: {
      ...mapState('app/settings/system', {_drawer: s => s.drawer}),

      /**
       * Get categories components
       *
       * @return Array
       */
      categories() {
        return [
          ConnectionSettings,
          PlayerSettings,
          SystemSettings,
          AppSettings,
        ]
      },

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
      ...mapActions('app/settings/system', {_setDrawer: 'setDrawer'}),

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
  }

</style>
