<template>
  <v-layout column fill-height>

    <v-toolbar class="shrink">
      <v-app-bar-nav-icon @click="backToSettingsCategories">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Подключение</v-toolbar-title>
    </v-toolbar>


    <v-list>

      <v-list-item>
        <v-list-item-content>
          <div class="caption grey--text">
            В данном разделе вы можете изменить настройки подключения к серверам anilibria.tv
          </div>
        </v-list-item-content>
      </v-list-item>


      <!-- Connection -->
      <v-subheader>Основной хост с точкой доступа API</v-subheader>
      <v-list-item>
        <v-list-item-content class="pt-0">
          <v-text-field hide-details outlined color="white" :value="_host" disabled/>
        </v-list-item-content>
      </v-list-item>


      <!-- Proxy -->
      <v-subheader>Прокси</v-subheader>
      <v-list-item>
        <v-list-item-content class="pt-0">
          <v-radio-group hide-details class="mt-0" color="white" disabled value="pac">
            <v-radio class="caption" v-for="(proxy, k) in proxies" v-bind="proxy" :key="n"/>
          </v-radio-group>
        </v-list-item-content>
      </v-list-item>


    </v-list>

  </v-layout>
</template>

<script>

  import {mapActions, mapState} from 'vuex'

  export default {
    data() {
      return {
        proxies: [
          {value: 'direct', label: 'Без прокси'},
          {value: 'pac', label: 'PAC прокси'},
          {value: 'custom', label: 'Собственный прокси сервер'},
        ]
      }
    },
    computed: {
      ...mapState('settings/connection', {
        _host: s => s.host,
      })
    },
    methods: {
      ...mapActions('settings', ['backToSettingsCategories']),
    }
  }
</script>

