<template>
  <v-layout column fill-height>

    <v-toolbar class="shrink">
      <v-app-bar-nav-icon @click="backToSettingsCategories">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Подключение</v-toolbar-title>
    </v-toolbar>

    <v-card color="transparent" flat>
      <v-card-text>
        <div class="mb-4">В данном разделе вы можете изменить настройки подключения к серверам anilibria.tv</div>

        <!-- Host -->
        <h4>Основной хост с точкой доступа API</h4>
        <v-text-field class="mt-2" hide-details outlined :value="_host" @input="setHost"/>
        <v-divider class="my-6"/>


        <!-- Proxy -->
        <h4>Прокси</h4>
        <v-radio-group class="mt-2" hide-details :value="getProxyType" @change="setProxyType">
          <v-radio v-for="(proxy, k) in proxies" v-bind="proxy" :key="k" />
        </v-radio-group>
        <v-divider class="my-6"/>


        <!-- PAC -->
        <h4>Настройка PAC прокси</h4>
        <div>В данной секции вы можете настроить параметры прокси-сервера, который использует PAC скрипт</div>
        <div class="pb-4">
          Обратите внимание, что хост и порт прокси-сервера, полученные из PAC скрипта,
          устанавливаются автоматически и редактировать их вручную, в большинстве случаев, не требуется
        </div>
        <v-text-field label="Источник PAC скрипта" hide-details outlined :value="_pac.source" @input="setPacSource" />
        <v-text-field
          class="mt-2"
          label="Хост прокси-сервера"
          hide-details
          outlined
          :value="_pac.connection.host"
          @input="host => setPacProxyConnection({host, port: _pac.connection.port})">
        </v-text-field>
        <v-text-field
          class="mt-2"
          label="Порт прокси-сервера"
          hide-details
          outlined
          :value="_pac.connection.port"
          @input="port => setPacProxyConnection({host: _pac.connection.host, port})">
        </v-text-field>
        <div class="pt-4">
          Чтобы запросить новые параметры подключения — оставьте эти хост и порт пустыми,
          при следующем запросе на сервер приложение автоматически запросит новые данные из PAC файла
        </div>
        <v-divider class="my-6"/>

        <!-- Custom proxy -->
        <h4>Настройка собственного прокси</h4>
        <div>
          Вы можете указать параметры подключения к своему собственному прокси-серверу.
          Приложение не сохраняет и не передает данные авторизации, а также другие параметры подключения
        </div>
        <v-text-field
          class="mt-2"
          label="Хост прокси-сервера"
          hide-details
          outlined
          :value="_custom.connection.host"
          @input="host => setCustomProxyConnection({host, port: _custom.connection.port})">
        </v-text-field>
        <v-text-field
          class="mt-2"
          label="Порт прокси-сервера"
          hide-details
          outlined
          :value="_custom.connection.port"
          @input="port => setCustomProxyConnection({host: _custom.connection.host, port})">
        </v-text-field>


      </v-card-text>
    </v-card>
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

