<template>
  <v-layout column fill-height ref="settings">

    <!-- Header -->
    <v-toolbar class="shrink" color="#1E1E1E">
      <v-app-bar-nav-icon @click="_backToSettingsCategories">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="body-1">Торренты</v-toolbar-title>
    </v-toolbar>


    <v-card ref="card">
      <v-list dense>
        <template v-for="(item, k) in settings">
          <v-divider v-if="k > 0" :key="`d:${k}`"/>
          <v-list-item :key="k" @click="item.action">
            <v-list-item-content>
              <v-list-item-title v-text="item.title"/>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-subtitle v-text="item.value"/>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card>


    <!-- Dialogs -->
    <template v-if="isMounted">
      <component
        v-for="(dialog,k) in dialogs"
        :is="dialog.component"
        :key="k"
        :ref="dialog.ref"
        :attach="$refs.settings">
      </component>
    </template>

  </v-layout>
</template>

<script>

  import {mapActions, mapState} from 'vuex'

  export default {
    data() {
      return {
        isMounted: false,
      }
    },

    computed: {
      ...mapState('app/settings/connection', {}),


      /**
       * Get settings items
       *
       * @return array
       */
      settings() {
        return [
          {
            title: 'Использовать торренты',
            value: true,
            action: () => ""
          }
        ]
      },


      /**
       * Get dialogs
       *
       * @return Array
       */
      dialogs() {
        return [
          //  {component: HostDialog, ref: 'host'},
          // {component: ProxyDialog, ref: 'proxy'},
        ]
      }


    },
    methods: {
      ...mapActions('app/settings', {_backToSettingsCategories: 'backToSettingsCategories'}),

    },

    mounted() {
      this.isMounted = true;
    }

  }
</script>
