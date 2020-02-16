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
        <v-text-field hide-details outlined :value="_host" @input="setHost"/>
      </v-list-item>


      <!-- Proxy -->
      <v-subheader>Прокси</v-subheader>
      <v-list-item>
        <v-list-item-content class="pt-0">
          <v-radio-group
            hide-details
            class="mt-2 ml-3"
            :value="getProxyType"
            @change="setProxyType">

            <v-radio
              v-for="(proxy, k) in proxies"
              v-bind="proxy"
              class="caption"
              :key="k">
            </v-radio>

          </v-radio-group>
        </v-list-item-content>
      </v-list-item>


      <!-- PAC proxy -->
      <v-subheader>Настройка PAC прокси</v-subheader>
      <v-list-item class="mt-0 mb-6">
        <div class="caption grey--text">
          <div>
            В данной секции вы можете настроить параметры прокси-сервера, который использует PAC скрипт
          </div>
          <div class="pt-1">
            Обратите внимание, что хост и порт прокси-сервера, полученные из PAC скрипта,
            устанавливаются автоматически и редактировать их вручную, в большинстве случаев, не требуется
          </div>
        </div>
      </v-list-item>
      <v-list-item>
        <v-text-field
          label="Источник PAC скрипта"
          hide-details
          outlined
          :value="_pac.source"
          @input="setPacSource">
        </v-text-field>
      </v-list-item>
      <v-list-item>
        <v-text-field
          class="mt-2"
          label="Хост прокси-сервера"
          hide-details
          outlined
          :value="_pac.connection.host"
          @input="host => setPacProxyConnection({host, port: _pac.connection.port})">
        </v-text-field>
      </v-list-item>
      <v-list-item>
        <v-text-field
          class="mt-2"
          label="Порт прокси-сервера"
          hide-details
          outlined
          :value="_pac.connection.port"
          @input="port => setPacProxyConnection({host: _pac.connection.host, port})">
        </v-text-field>
      </v-list-item>
      <v-list-item class="my-4">
        <div class="caption grey--text">
          Чтобы запросить новые параметры подключения — оставьте эти хост и порт пустыми,
          при следующем запросе на сервер приложение автоматически запросит новые данные из PAC файла
        </div>
      </v-list-item>


      <!-- Custom proxy -->
      <v-subheader>Настройка собственного прокси</v-subheader>
      <v-list-item class="mb-4">
        <div class="caption grey--text">
          Вы можете указать параметры подключения к своему собственному прокси-серверу.
          Приложение не сохраняет и не передает данные авторизации, а также другие параметры подключения
        </div>
      </v-list-item>

      <!-- Custom proxy host -->
      <v-list-item>
        <v-text-field
          class="mt-2"
          label="Хост прокси-сервера"
          hide-details
          outlined
          :value="_custom.connection.host"
          @input="host => setCustomProxyConnection({host, port: _custom.connection.port})">
        </v-text-field>
      </v-list-item>

      <!-- Custom proxy port -->
      <v-list-item class="pb-8">
        <v-text-field
          class="mt-2"
          label="Порт прокси-сервера"
          hide-details
          outlined
          :value="_custom.connection.port"
          @input="port => setCustomProxyConnection({host: _custom.connection.host, port})">
        </v-text-field>
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
      }


    },
    methods: {
      ...mapActions('settings', ['backToSettingsCategories']),
      ...mapActions('settings/connection', [
        'setHost',
        'setProxyType',
        'setPacSource',
        'setPacProxyConnection',
        'setCustomProxyConnection'
      ]),

    },
  }
</script>

