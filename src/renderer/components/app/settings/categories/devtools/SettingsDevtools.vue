<template>
  <div ref="settings">

    <div class="pa-4 caption grey--text">
      <div class="body-1">Инструменты отладки</div>
      <div>Список инструментов для отладки приложения. Предназначены, в основном, для разработчиков</div>
    </div>

    <v-card>
      <v-list dense>
        <template v-for="(item, k) in settings">
          <v-divider v-if="k > 0" :key="`d:${k}`"/>
          <v-list-item :key="k" @click="item.action">
            <v-list-item-content>
              <v-list-item-title v-text="item.title" :class="item.classes"/>
            </v-list-item-content>
            <v-list-item-action class="text-right">
              <v-list-item-subtitle v-text="item.value"/>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card>

  </div>
</template>

<script>

  import {ipcRenderer as ipc} from 'electron'
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState('releases', {_releases: 'data'}),

      /**
       * Get settings items
       *
       * @return array
       */
      settings() {
        return [
          {
            title: 'Консоль приложения',
            action: () => ipc.send('app:devtools:main'),
          },
          {
            title: 'Консоль торрент-сервера',
            action: () => ipc.send('app:devtools:torrent'),
          },
          {
            title: 'Консоль chromecast клиента',
            action: () => ipc.send('app:devtools:chromecast'),
          },
          {
            title: 'Показать уведомление',
            action: () => ipc.send('app:notification', this._releases[0])
          },
          {
            title: 'Добавить уведомление в стор',
            action: () => this._setRelease(this._releases[0])
          }
        ]
      },
    },

    methods: {
      ...mapActions('notifications', {_setRelease: 'setRelease'}),

    }

  }
</script>
