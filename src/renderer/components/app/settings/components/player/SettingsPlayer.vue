<template>
  <v-layout column>
    <v-toolbar>
      <v-app-bar-nav-icon @click="backToSettingsCategories">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Воспроизведение</v-toolbar-title>
    </v-toolbar>
    <v-card color="transparent" flat>
      <v-card-text>

        <!-- Player Type -->
        <h4>Способ воспроизведения</h4>
        <div>Укажите, каким образом приложение будет воспроизводить выбранный тайтл</div>
        <v-radio-group hide-details :value="type" @change="setPlayerType">
          <v-radio v-for="(type, k) in types" v-bind="type" :key="k"/>
        </v-radio-group>

        <v-divider class="my-6"/>

        <!-- Stream Quality -->
        <h4>Качество онлайн воспроизведения</h4>
        <div>Выберите качество онлайн воспроизведения по умолчанию</div>
        <div>Переключить качество всегда можно в плеере во время просмотра</div>
        <v-radio-group hide-details :value="streamQuality" @change="setStreamQuality">
          <v-radio v-for="(quality, k) in stream.qualities" v-bind="quality" :key="k"/>
        </v-radio-group>


      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>

  import {mapActions, mapState} from 'vuex'

  export default {
    data() {
      return {
        types: [
          {value: 'stream', label: 'Онлайн'},
          {value: 'torrent', label: 'Торрент', disabled: true}
        ],
        stream: {
          qualities: [
            {value: 'fhd', label: '1080'},
            {value: 'hd', label: '720'},
            {value: 'sd', label: '480'},
          ]
        }
      }
    },
    computed: {
      ...mapState('app/settings/player', {
        type: s => s.type,
        streamQuality: s => s.stream.quality,
      })
    },

    methods: {
      ...mapActions('app/settings', ['backToSettingsCategories']),
      ...mapActions('app/settings/player', ['setPlayerType', 'setStreamQuality'])
    }
  }
</script>
