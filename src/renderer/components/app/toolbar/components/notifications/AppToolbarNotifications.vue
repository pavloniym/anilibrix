<template>
  <v-menu v-if="_notifications" left nudge-bottom="55" min-width="400" max-width="400" max-height="300">

    <template v-slot:activator="{ on }">
      <v-badge overlap bordered dot offset-x="15" offset-y="20" :content="unseen" :value="unseen > 0">
        <v-btn v-on="on" icon @click="_setSeen">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <v-card v-if="_items && _items.length > 0">
      <v-layout align-center class="px-4 py-2">
        <h5 class="grey--text">Последние уведомления за неделю</h5>
        <v-spacer/>
        <v-btn icon color="grey" @click.stop="_clearNotifications">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-layout>
      <v-divider />
      <v-list dense>
        <template v-for="(item, k) in _items">
          <v-divider v-if="k > 0" :key="`d: ${k}`"/>
          <v-list-item :key="k" @click="toVideo(item)">
            <v-list-item-avatar>
              <v-img :src="item.release.poster.image"/>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.release.names.ru"/>
              <v-list-item-subtitle v-text="item.episode.title"/>
              <v-list-item-subtitle v-text="getDatetime(item)"/>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>

    <v-card v-else>
      <v-card-text>
        Пока что здесь нет ни одного уведомления
      </v-card-text>
    </v-card>

  </v-menu>
</template>

<script>


  import moment from 'moment'
  import {ipcRenderer as ipc} from 'electron'
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState('notifications', {_items: s => s.items}),
      ...mapState('app/settings/system', {_notifications: s => s.notifications.app}),


      /**
       * Unseen
       *
       * @return {number}
       */
      unseen() {
        return this._items.filter(item => item.is_seen === false).length
      }

    },

    methods: {
      ...mapActions('notifications', {
        _setSeen: 'setSeen',
        _clearNotifications: 'clearNotifications'
      }),


      /**
       * Watch episode
       *
       * @param release
       * @param episode
       */
      toVideo({release, episode}) {
        if (release && episode) {
          this.$router.push({
            name: 'video',
            params: {
              key: `${release.id}:${episode.id}`,
              release: release,
              episode: episode,
              releaseName: release.names.original
            }
          });
        }
      },


      /**
       * Get datetime
       *
       * @param notification
       * @return {string}
       */
      getDatetime(notification) {
        return moment(notification.datetime).fromNow();
      },

    },

    watch: {

      unseen: {
        immediate: true,
        handler(unseen) {
          ipc.send('app:dock:number', unseen)
        }
      }

    }
  }
</script>
