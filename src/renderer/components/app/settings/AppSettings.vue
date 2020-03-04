<template>
  <v-navigation-drawer app absolute stateless right width="400" :value="_drawer">
    <component :is="component"/>
  </v-navigation-drawer>
</template>

<script>

  import {mapState} from 'vuex'
  import __get from 'lodash/get'

  import Components from './components'

  export default {
    name: 'AppSettings',
    computed: {
      ...mapState('settings', {
        _drawer: s => s.drawer,
        _component: s => s.component
      }),

      /**
       * Get active component
       *
       * @return {*}
       */
      component() {
        return __get(Components, this._component, null)
      }
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
