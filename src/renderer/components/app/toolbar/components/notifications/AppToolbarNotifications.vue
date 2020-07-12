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
        <template v-for="(notification, k) in _items">
          <v-divider v-if="k > 0" :key="`d: ${k}`"/>
          <notification-item v-bind="{notification}" :key="k" />
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

  import NotificationItem from './components/item'
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {
      NotificationItem
    },
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
      })
    }

  }
</script>
