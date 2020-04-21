<template>
  <v-overlay v-if="visible" absolute opacity=".85">
    <v-dialog v-bind="{attach}" v-model="visible" hide-overlay>
      <v-card>
        <v-card-title>Частота обновления</v-card-title>
        <v-card-subtitle class="pt-2 pb-0">Вы указать частоту автоматического обновления релизов</v-card-subtitle>
        <v-card-text>
          <v-text-field
            v-model="timeout"
            hide-details
            suffix="мин"
            autocomplete="off"
            :autofocus="true">
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text :disabled="isValid === false" @click="setTimeout">Сохранить</v-btn>
          <v-btn text @click="visible = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-overlay>
</template>

<script>

  import {mapState, mapActions} from 'vuex'

  const props = {
    attach: {
      type: HTMLDivElement,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        timeout: 0,
        visible: false,
      }
    },


    computed: {
      ...mapState('app/settings/system', {_timeout: s => s.updates.timeout}),

      /**
       * Check if timeout is valid
       *
       * @return Boolean
       */
      isValid() {
        return parseInt(this.timeout) > 0
      }

    },

    methods: {
      ...mapActions('app/settings/system', {_setUpdatesTimeout: 'setUpdatesTimeout'}),

      /**
       * Show dialog
       *
       * @return void
       */
      showDialog() {
        this.visible = true;
      },


      /**
       * Set timeout
       *
       * @return void
       */
      setTimeout() {
        this._setUpdatesTimeout(this.timeout);
        this.visible = false;
      }
    },

    watch: {

      _timeout: {
        immediate: true,
        handler(timeout) {
          this.timeout = timeout;
        }
      }

    }

  }
</script>
