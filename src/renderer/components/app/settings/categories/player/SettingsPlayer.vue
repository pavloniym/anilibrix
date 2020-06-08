<template>
  <div ref="settings">

    <div class="pa-4 caption grey--text">
      <div class="body-1">Настройки воспроизведения релизов</div>
      <div>
        В данном разделе вы можете настроить возможность смотреть релизы, используя торренты,
        а также другие настройки воспроизведения
      </div>
    </div>

    <!-- Torrents -->
    <v-card>
      <v-card-subtitle class="pb-0 font-weight-bold">Торренты</v-card-subtitle>
      <v-card-subtitle class="py-0 pb-2">
        <div class="caption pb-1">
          Вы можете подключить торренты, которые автоматически буду связаны с эпизодами релизов
          и доступны для просмотра.
        </div>
        <div class="caption">
          Торренты не требуют стороннего плеера или клиента и доступны онлайн,
          в меню выбора качества воспроизведения релиза.
        </div>
      </v-card-subtitle>

      <v-list-item dense @click="_setTorrentsProcess(!_torrents.process)">
        <v-list-item-title>Воспроизоводить торренты</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_torrents.process" @change="_setTorrentsProcess" />
        </v-list-item-action>
      </v-list-item>

      <v-card-text class="pt-2">
        <div class="caption">
          Использование торрентов требует бОльшего времени подключения и парсинга,
          что может негативно сказаться на скорости загрузки данных по релизам,
          особенно — при использовании прокси-сервера
        </div>
      </v-card-text>
    </v-card>
    <v-divider/>


    <!-- Autoplay -->
    <v-card>
      <v-list-item dense @click="_setAutoplayNext(!_autoplayNext)">
        <v-list-item-title>Автовоспроизведение следующего эпизода</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_autoplayNext" @change="_setAutoplayNext" />
        </v-list-item-action>
      </v-list-item>
    </v-card>

  </div>
</template>

<script>

  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState('app/settings/player', {
        _torrents: s => s.torrents,
        _autoplayNext: s => s.autoplayNext,
      })
    },


    methods: {
      ...mapActions('app/settings/player', {
        _setAutoplayNext: 'setAutoplayNext',
        _setTorrentsProcess: 'setTorrentsProcess'
      })
    }

  }
</script>
