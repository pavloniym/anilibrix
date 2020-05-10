<template>
  <v-overlay v-if="visible" absolute opacity=".7">
    <v-dialog v-bind="{attach}" v-model="visible" hide-overlay>
      <v-card>
        <v-card-title>Настройка подключения</v-card-title>
        <v-card-subtitle class="pt-2">Укажите способ подключения к API портала</v-card-subtitle>
        <v-card-text>

          <!-- Proxy type -->
          <v-radio-group hide-details class="mt-0" :value="_type" @change="_setProxy">
            <v-radio v-for="(proxy, k) in proxies" v-bind="proxy" :key="k"/>
          </v-radio-group>

          <div class="my-6 caption grey--text">
            Использование прокси-сервера может помочь, если <b>Anilibria</b> не доступна в Вашем регионе
          </div>

          <!-- PAC Source -->
          <template v-if="_type === 'pac'">
            <v-text-field
              hide-details
              label="Источник PAC скрипта"
              :value="_pac.source"
              @input="_setProxyPacSource">
            </v-text-field>
          </template>


          <!-- Custom Proxy -->
          <template v-if="_type === 'custom'">
            <v-text-field
              hide-details
              label="Хост прокси-сервера"
              :value="_custom.host"
              @input="host => _setProxyCustomConnection({..._custom, host})">
            </v-text-field>
            <v-text-field
              hide-details
              class="mt-2"
              label="Порт прокси-сервера"
              :value="_custom.port"
              @input="port => _setProxyCustomConnection({..._custom, port})">
            </v-text-field>
          </template>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="visible = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-overlay>
</template>

<script>

  const props = {
    attach: {
      type: HTMLDivElement,
      default: null
    }
  };

  import {mapActions, mapState} from 'vuex'

  export default {
    props,
    data() {
      return {
        visible: false,
        proxies: [
          {value: 'direct', label: 'Отключить прокси'},
          {value: 'pac', label: 'PAC прокси', source: null},
          {value: 'custom', label: 'Использовать собственный прокси'},
        ]
      }
    },

    computed: {
      ...mapState('app/settings/connection', {
        _pac: s => s.proxy.pac,
        _type: s => s.proxy.type || 'direct',
        _custom: s => s.proxy.custom,
      }),

    },


    methods: {
      ...mapActions('app/settings/connection', {
        _setProxy: 'setProxy',
        _setProxyPacSource: 'setProxyPacSource',
        _setProxyCustomConnection: 'setProxyCustomConnection'
      }),


      /**
       * Show dialog
       *
       * @return void
       */
      showDialog() {
        this.visible = true;
      },

    }
  }
</script>
