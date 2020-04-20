<template>
  <v-overlay v-if="visible" absolute opacity=".85">
    <v-dialog v-bind="{attach}" v-model="visible" hide-overlay>
      <v-card>
        <v-card-title>Настройка точки доступа</v-card-title>
        <v-card-subtitle class="pt-2 pb-0">Укажите адрес точки доступа к порталу Anilibria</v-card-subtitle>
        <v-card-text>
          <v-text-field v-model="host" hide-details/>
          <div class="pt-4 caption grey--text">
            Иногда, для более корректного подключения, необходимо вписать полный адрес точки доступа,
            включая <b>http</b> и <b>www</b>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="saveHost">Сохранить</v-btn>
          <v-btn text @click="visible = false">Отмена</v-btn>
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
        host: null,
      }
    },

    computed: {
      ...mapState('app/settings/connection', {
        _host: s => s.host,
      }),
    },


    methods: {
      ...mapActions('app/settings/connection', {_setHost: 'setHost'}),

      /**
       * Show dialog
       *
       * @return void
       */
      showDialog() {
        this.visible = true;
      },


      /**
       * Save host value
       *
       * @return void
       */
      saveHost() {
        this._setHost(this.host);
        this.visible = false;
      }
    },

    watch: {
      _host: {
        immediate: true,
        handler(host) {
          this.host = host;
        }
      }

    }
  }
</script>
