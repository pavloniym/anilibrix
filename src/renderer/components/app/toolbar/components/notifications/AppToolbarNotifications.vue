<template>
  <v-menu left nudge-bottom="55" min-width="400" max-width="400" max-height="300">

    <template v-slot:activator="{ on }">
      <v-badge overlap bordered dot offset-x="15" offset-y="20" :content="unseen" :value="unseen > 0">
        <v-btn v-on="on" icon @click="_setSeen">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <!-- Notifications -->
    <v-card v-if="_items && _items.length > 0" elevation="12">
      <v-layout align-center class="px-4 py-2">
        <h5 class="grey--text">Последние уведомления за неделю</h5>
        <v-spacer/>
        <v-btn icon color="grey" @click.stop="_clearNotifications">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-layout>
      <v-divider/>
      <v-list dense>
        <template v-for="(item, k) in _items">
          <v-divider v-if="k > 0" :key="`d: ${k}`"/>
          <v-list-item :key="k" @click="toVideo(item)">
            <v-list-item-avatar>
              <v-img :src="item.release.poster.image"/>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.release.names.ru"/>
              <v-list-item-subtitle>Вышла {{item.episode.id}} серия</v-list-item-subtitle>
              <v-list-item-subtitle v-text="getDatetime(item)" class="grey--text text--darken-2"/>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>

    <!-- Empty -->
    <v-card v-else>
      <v-layout align-center class="pa-4 caption grey--text">
        <div class="mr-4">
          <v-icon color="grey">mdi-bell</v-icon>
        </div>
        <div>
          <div>Пока что здесь нет ни одного уведомления</div>
          <div>Возможно скоро выйдет что-то интересное ...</div>
        </div>
      </v-layout>
    </v-card>

  </v-menu>
</template>

<script>

  import moment from 'moment'
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState('notifications', {_items: s => s.items}),


      /**
       * Get unseen notifications
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
          this.$electron.ipcRenderer.send('app:dock:number', unseen)
        }
      }

    }
  }
</script>
