<template>
  <v-overlay v-if="visible" absolute opacity=".85">
    <v-dialog v-bind="{attach}" v-model="visible" hide-overlay>
      <v-card>
        <v-card-title>Воспроизведение торрентов</v-card-title>
        <v-card-subtitle class="pt-2 pb-0">
          <div class="pb-2">
            Вы можете подключить торренты, которые автоматически буду связаны с эпизодами релизов
            и доступны для просмотра.
          </div>
          <div>
            Торренты не требуют стороннего плеера или клиента и доступны онлайн,
            в меню выбора качества воспроизведения релиза.
          </div>
        </v-card-subtitle>
        <v-card-text>
          <v-checkbox label="Использовать торренты" :input-value="_process" @change="_setTorrentsProcess($event)" />
          <div class="caption grey--text">
            Использование торрентов требует бОльшего времени подключения и парсинга,
            что может негативно сказаться на скорости загрузки данных по релизам,
            особенно — при использовании прокси-сервера
          </div>
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
      }
    },

    computed: {
      ...mapState('app/settings/player', {_process: s => s.torrents.process}),
    },


    methods: {
      ...mapActions('app/settings/player', {_setTorrentsProcess: 'setTorrentsProcess'}),

      /**
       * Show dialog
       *
       * @return void
       */
      showDialog() {
        this.visible = true;
      }

    }
  }
</script>
