<template>
  <div ref="settings">

    <div class="pa-4 caption grey--text">
      <div class="body-1">Настройки подключения</div>
      <div>
        Если вы испытываете проблемы с подключением или портал недоступен в Вашем регионе,
        то в данном разделе вы можете более тонко настроить способ подключения
      </div>
    </div>

    <!-- Host -->
    <v-card>
      <v-card-subtitle class="pb-0 font-weight-bold">Настройка точки доступа</v-card-subtitle>
      <v-card-subtitle class="py-0 pb-2">Укажите адрес точки доступа к порталу Anilibria</v-card-subtitle>
      <v-card-text>
        <v-text-field
          outlined
          hide-details
          class="my-4"
          label="Адрес точки доступа"
          :value="_host"
          @input="_setHost($event)">
        </v-text-field>
        <div class="caption">
          Иногда, для более корректного подключения, необходимо вписать полный адрес точки доступа,
          включая <b>http</b> и <b>www</b>
        </div>
      </v-card-text>
    </v-card>
    <v-divider/>


    <!-- Proxy -->
    <v-card>
      <v-card-subtitle class="pb-0 font-weight-bold">Настройка подключения</v-card-subtitle>
      <v-card-subtitle class="py-0">Укажите способ подключения к API портала<</v-card-subtitle>
      <v-card-text>
        <v-radio-group hide-details class="my-4" :value="_type" @change="_setProxy">
          <v-radio v-for="(proxy, k) in proxies" v-bind="proxy" :key="k"/>
        </v-radio-group>
        <div class="caption">Использование прокси-сервера может помочь, если <b>Anilibria</b> не доступна в Вашем
          регионе
        </div>
      </v-card-text>
    </v-card>
    <v-divider/>


    <!-- Pac Proxy Settings -->
    <template v-if="_type === 'pac'">
      <v-card>
        <v-card-subtitle class="pb-0 font-weight-bold">Параметры PAC прокси</v-card-subtitle>
        <v-card-subtitle class="py-0 pb-2">
          Укажите ссылку на валидный PAC скрипт, который будет использоваться приложением
        </v-card-subtitle>
        <v-card-text>
          <v-text-field
            outlined
            hide-details
            class="my-4"
            label="Ссылка на PAC скрипт"
            :value="_pac.source"
            @input="_setProxyPacSource">
          </v-text-field>
        </v-card-text>
      </v-card>
      <v-divider/>
    </template>


    <!-- Custom Proxy Settings -->
    <template v-if="_type === 'custom'">
      <v-card>
        <v-card-subtitle class="pb-0 font-weight-bold">Параметры собственного прокси</v-card-subtitle>
        <v-card-subtitle class="py-0 pb-2">
          Укажите хост и порт собственного прокси. Прокси должен уметь работать через https соединение
        </v-card-subtitle>
        <v-card-text>
          <v-text-field
            outlined
            hide-details
            label="Хост прокси-сервера"
            class="mt-4 mb-2"
            :value="_custom.host"
            @input="host => _setProxyCustomConnection({..._custom, host})">
          </v-text-field>
          <v-text-field
            outlined
            hide-details
            class="mb-4"
            label="Порт прокси-сервера"
            :value="_custom.port"
            @input="port => _setProxyCustomConnection({..._custom, port})">
          </v-text-field>
        </v-card-text>
      </v-card>
      <v-divider/>
    </template>


  </div>
</template>

<script>

  import {mapActions, mapState} from 'vuex'

  export default {
    data() {
      return {
        proxies: [
          {value: 'direct', label: 'Отключить прокси'},
          {value: 'pac', label: 'PAC прокси', source: null},
          {value: 'custom', label: 'Использовать собственный прокси'},
        ],
      }
    },

    computed: {
      ...mapState('app/settings/connection', {
        _pac: s => s.proxy.pac,
        _host: s => s.host,
        _type: s => s.proxy.type || 'direct',
        _custom: s => s.proxy.custom,
      }),
    },

    methods: {
      ...mapActions('app/settings/connection', {
        _setHost: 'setHost',
        _setProxy: 'setProxy',
        _setProxyPacSource: 'setProxyPacSource',
        _setProxyCustomConnection: 'setProxyCustomConnection'
      }),
    },


  }
</script>
