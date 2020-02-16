<template>
  <v-navigation-drawer app right floating temporary width="400" :value="_drawer" @input="_setDrawer">
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
      ...mapActions('settings', {_setDrawer: 'setDrawer'})
    }
  }
</script>
<style lang="scss" scoped>

  nav ::v-deep {
    .v-navigation-drawer__content {
      overflow-y: scroll;

      &::-webkit-scrollbar-thumb {
        background-color: #505050;
      }

      &::-webkit-scrollbar {
        width: 8px;
        background-color: #bfbfbf;
      }
    }


  }


</style>
