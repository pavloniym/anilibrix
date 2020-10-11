<script>

  // Utils
  import {mapState} from 'vuex'

  // Resolvers
  import NotificationsResolver from "@@/utils/resolvers/notifications";

  // Routes
  import {toVideo} from "@router/video/videoRoutes";

  export default {
    render: () => null,
    computed: {
      ...mapState('app/settings', {_system_notifications: s => s.app.notifications.system}),
      ...mapState('notifications', {_items: s => s.items}),


      /**
       * Get unseen notifications
       *
       * @return {number}
       */
      unseenNotifications() {
        return this._items.filter(item => item.is_seen === false).length
      }

    },

    methods: {

      /**
       * Show notification
       *
       * @param release
       * @param episode
       * @return {void}
       */
      showNotification({release, episode}) {

        // Check if release is set
        // Check if system notifications is enabled
        if (release && episode && this._system_notifications === true) {

          // Show notification
          const title = this.$__get(episode, 'title');
          const name = this.$__get(release, 'names.ru');

          if (title && name) {

            // Set notification name
            NotificationsResolver.setAppUserModelId();

            // Create notification
            const notification = new window.Notification(title, {body: name});

            // If the user clicks in the Notifications Center, show the app
            notification.onclick = () => toVideo(release.id, episode.id);

          }
        }
      }

    },


    created() {
      NotificationsResolver.catchNotification(this.showNotification);
    },

    destroyed() {
      NotificationsResolver.unsubscribeNotification(this.showNotification);
    },


    watch: {
      unseenNotifications: {
        immediate: true,
        handler(unseen_notifications_number) {
          NotificationsResolver.sendNotificationsNumber(unseen_notifications_number);
        }
      }
    }


  }
</script>
