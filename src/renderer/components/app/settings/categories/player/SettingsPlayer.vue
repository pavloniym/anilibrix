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
      <v-list-item dense @click="_setTorrentsProcess(!_torrents)">
        <v-list-item-title>Воспроизоводить торренты</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_torrents" @change="_setTorrentsProcess"/>
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

    <!-- Upscale -->
    <!--<v-card class="mt-2">
      <v-list-item dense @click="_setUpscaleProcess(!_upscale)">
        <v-list-item-title>Включить 4K интерполяцию</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_upscale" @change="_setUpscaleProcess"/>
        </v-list-item-action>
      </v-list-item>
      <v-card-text class="pt-2">
        <div class="caption">
          Позволяет выбрать 2k и 4k разрешения,
          которые получаются с помощью специального алгоритма нейросети в реальном времени.
        </div>
      </v-card-text>
    </v-card>-->

    <!-- Autoplay -->
    <v-card class="mt-2">
      <v-list-item dense @click="_setAutoplayNext(!_autoplayNext)">
        <v-list-item-title>Автовоспроизведение следующего эпизода</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_autoplayNext" @change="_setAutoplayNext"/>
        </v-list-item-action>
      </v-list-item>
      <v-card-text class="pt-2 caption">
        После окончания эпизода плеер автоматически начнет воспроизведение следующего эпизода в релизе,
        при его наличии
      </v-card-text>
    </v-card>


    <!-- Opening Skip Button -->
    <v-card class="mt-2">
      <v-list-item dense @click="_setOpeningSkipButton(!_opening_skip_button)">
        <v-list-item-title>Кнопка пропуска опенинга</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_opening_skip_button" @change="_setOpeningSkipButton"/>
        </v-list-item-action>
      </v-list-item>
      <v-card-text class="pt-2 caption">
        <div>
          В интерфейсе плеера появится дополнительная кнопка, которая перемотает плеер на указанное количество секунд
        </div>
        <div>Данная кнопка не гарантирует корректный пропуск опенинга</div>
      </v-card-text>
    </v-card>
    <v-divider/>

    <!-- Opening Skip Time -->
    <v-card>
      <v-card-text class="pb-2 caption">Вы можете указать на сколько секунд пропускать опенинг</v-card-text>
      <v-card-text>
        <v-text-field
          outlined
          hide-details
          class="mb-2"
          type="number"
          label="Количество секунд для пропуска опенинга"
          suffix="сек"
          :value="_opening_skip_time"
          @input="_setOpeningSkipTime($event ? parseInt($event) : 0)">
        </v-text-field>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>

  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState('app/settings/player', {
        _upscale: s => s.upscale.process,
        _torrents: s => s.torrents.process,
        _autoplayNext: s => s.autoplayNext,
        _opening_skip_time: s => s.opening.skip_time,
        _opening_skip_button: s => s.opening.skip_button,
      })
    },


    methods: {
      ...mapActions('app/settings/player', {
        _setAutoplayNext: 'setAutoplayNext',
        _setUpscaleProcess: 'setUpscaleProcess',
        _setTorrentsProcess: 'setTorrentsProcess',
        _setOpeningSkipTime: 'setOpeningSkipTime',
        _setOpeningSkipButton: 'setOpeningSkipButton',
      })
    }

  }
</script>
