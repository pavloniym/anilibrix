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

  // Utils
  import {mapState, mapActions} from 'vuex'

  // Handlers
  import {sendReleaseNotification} from "@main/handlers/notifications/notificationsHandler";
  import {sendAppDevtoolsMainEvent, sendAppDevtoolsTorrentEvent,} from "@main/handlers/app/appHandlers";

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
            action: sendAppDevtoolsMainEvent,
          },
          {
            title: 'Консоль торрент-сервера',
            action: sendAppDevtoolsTorrentEvent,
          },
          {
            title: 'Показать уведомление',
            action: () => sendReleaseNotification(this._releases[0])
          },
          {
            title: 'Добавить уведомление в хранилище',
            action: () => this._setRelease(this._releases[0])
          },
          {
            title: 'Показать данные хранилища в консоли',
            action: () => console.log(this.$store.state),
          }
        ]
      },
    },

    methods: {
      ...mapActions('notifications', {_setRelease: 'setRelease'}),

    }

  }
</script>
