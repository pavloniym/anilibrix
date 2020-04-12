<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    right
    fixed
    temporary
    width="400"
    class="settings">

    <component :is="component"/>

  </v-navigation-drawer>
</template>

<script>

  import __get from 'lodash/get'
  import { mapState, mapActions } from 'vuex'

  import Components from './components'

  export default {
    name: 'AppSettings',
    computed: {
      ...mapState('settings', {
        _drawer: s => s.drawer,
        _component: s => s.component
      }),

      drawer: {

        /**
         * Get drawer state
         *
         * @return boolean
         */
        get() {
          return this._drawer;
        },

        /**
         * Set drawer state
         *
         * @param state
         * @return void
         */
        set(state) {
          this.setDrawer(state);
        }
      },

      /**
       * Get active component
       *
       * @return {*}
       */
      component() {
        return __get(Components, this._component, null)
      }
    },

    methods: {
      ...mapActions('settings', ['setDrawer']),
    }

  }
</script>
<style lang="scss" scoped>

  .settings {
    z-index: 10;

    ::v-deep {
      .v-navigation-drawer__content {
        overflow-y: scroll;

      }

    }
  }


</style>
