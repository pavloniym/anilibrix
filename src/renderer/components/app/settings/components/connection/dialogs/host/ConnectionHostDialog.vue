<template>
  <v-overlay v-if="visible" absolute opacity=".7">
    <v-dialog v-bind="{attach}" v-model="visible" hide-overlay>
      <v-card>
        <v-card-title>Настройка точки доступа</v-card-title>
        <v-card-subtitle class="pt-2">Укажите адрес точки доступа к порталу anilibria.tv</v-card-subtitle>
        <v-card-text>
          <v-text-field v-model="host" hide-details/>
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
      ...mapState('settings/connection', {
        _host: s => s.host,
      }),
    },


    methods: {
      ...mapActions('settings/connection', ['setHost']),

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
        this.setHost(this.host);
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
