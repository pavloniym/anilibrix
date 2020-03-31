<template>
  <v-layout column fill-height ref="settings">

    <!-- Header -->
    <v-toolbar class="shrink">
      <v-app-bar-nav-icon @click="backToSettingsCategories">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="body-1">Подключение</v-toolbar-title>
    </v-toolbar>


    <v-card ref="card" >
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
      <host-dialog ref="host" :attach="$refs.settings"/>
      <proxy-dialog ref="proxy" :attach="$refs.settings" />
    </template>

  </v-layout>
</template>

<script>

  import HostDialog from './dialogs/host'
  import ProxyDialog from './dialogs/proxy'

  import {mapActions, mapState} from 'vuex'

  export default {
    components: {
      HostDialog,
      ProxyDialog,
    },
    data() {
      return {
        isMounted: false,
        proxies: {
          direct: 'Без прокси',
          pac: 'PAC прокси',
          custom: 'Собственный прокси сервер',
        },
      }
    },

    computed: {
      ...mapState('settings/connection', {
        _host: s => s.host,
        _pac: s => s.proxy.pac,
        _custom: s => s.proxy.custom,
      }),


      /**
       * Get proxy connection type
       *
       * @return {string}
       */
      getProxyType() {
        if (this._pac.active) return 'pac';
        if (this._custom.active) return 'custom';

        return 'direct';
      },


      /**
       * Get settings items
       *
       * @return array
       */
      settings() {
        return [
          {
            title: 'Точка доступа',
            value: this._host,
            action: () => this.$refs.host.showDialog(),
          },
          {
            title: 'Тип подключения',
            value: this.proxies[this.getProxyType],
            action: () => this.$refs.proxy.showDialog(),
          }
        ]
      },


    },
    methods: {
      ...mapActions('settings', ['backToSettingsCategories']),
      ...mapActions('settings/connection', [
        'setProxyType',
        'setPacSource',
        'setPacProxyConnection',
        'setCustomProxyConnection'
      ]),

    },

    mounted() {
      this.isMounted = true;
    }

  }
</script>

