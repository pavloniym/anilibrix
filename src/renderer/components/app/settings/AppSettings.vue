<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    right
    temporary
    width="400">

    <component :is="component"/>

  </v-navigation-drawer>
</template>

<script>

  import {mapState, mapActions} from 'vuex'
  import __get from 'lodash/get'

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

  nav ::v-deep {
    .v-navigation-drawer__content {
      overflow-y: scroll;


    }


  }


</style>
