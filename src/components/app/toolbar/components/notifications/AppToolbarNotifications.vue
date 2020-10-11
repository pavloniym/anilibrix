<template>
  <div>

    <!-- Icon -->
    <v-badge
      overlap
      bordered
      dot
      id="toolbar__notifications"
      offset-x="15"
      offset-y="20"
      :value="hasUnseenNotifications">
      <v-btn icon @click="_setAllNotificationsSeen">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-badge>


    <!-- Menu -->
    <v-menu left activator="#toolbar__notifications" nudge-bottom="55" min-width="400" max-width="400" max-height="300">

      <!-- Empty -->
      <!-- Notifications -->
      <empty v-if="_items.length === 0"/>
      <notifications
        v-else
        :items="_items"
        @notifications:open="toVideo($event.release_id, $event.episode_id)"
        @notifications:clear="_clearNotifications">
      </notifications>


    </v-menu>
  </div>
</template>

<script>

  // Components
  import Empty from './_components/empty'
  import Notifications from './_components/items'

  // Storage
  import {mapState, mapActions} from 'vuex'

  // Routes
  import {toVideo} from "@router/video/videoRoutes";

  export default {
    components: {
      Empty,
      Notifications,
    },
    computed: {
      ...mapState('notifications', {_items: s => s.items || []}),


      /**
       * Check if has unseen notifications
       *
       * @return {boolean}
       */
      hasUnseenNotifications() {
        return this._items.filter(item => item.is_seen === false).length > 0
      }

    },

    methods: {
      ...{toVideo},
      ...mapActions('notifications', {
        _clearNotifications: 'clearNotifications',
        _setAllNotificationsSeen: 'setAllNotificationsSeen'
      }),
    }

  }
</script>
