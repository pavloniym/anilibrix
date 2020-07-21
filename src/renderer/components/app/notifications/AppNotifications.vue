<script>

  // Utils
  import {meta} from '@package'
  import {toVideo} from "@utils/router/views";
  import {mapState} from 'vuex'

  // Handlers
  import {emitAppDockNumber} from "@main/handlers/app/appHandlers";
  import {handleReleaseNotification} from "@main/handlers/notifications/notificationsHandler";

  export default {
    render: () => null,
    computed: {
      ...mapState('notifications', {_items: s => s.items}),
      ...mapState('app/settings/system', {_notifications: s => s.notifications.system}),


      /**
       * Get unseen notifications
       *
       * @return {number}
       */
      unseen() {
        return this._items.filter(item => item.is_seen === false).length
      }

    },


    created() {
      handleReleaseNotification((release => {

        // Check if release is set
        // Check if system notifications is enabled
        if (release && this._notifications === true) {

          // Show notification
          const episode = release.episodes[0];
          const title = episode ? episode.title : null;

          const name = release.names.ru;
          const poster = release.poster;

          if (title && name) {

            // Set notification name
            this.$electron.remote.app.setAppUserModelId(meta.name);

            // Create notification
            // If the user clicks in the Notifications Center, show the app
            const notification = new window.Notification(title, {body: name, icon: poster});
            notification.onclick = () => toVideo(release, episode);

          }
        }

      }));
    },

    watch: {
      unseen: {
        immediate: true,
        handler(unseen) {
          emitAppDockNumber(unseen);
        }
      }
    }


  }
</script>
