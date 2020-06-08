<script>

  import {meta} from '@package'
  import {mapState} from 'vuex'
  import {remote, ipcRenderer as ipc} from 'electron'

  export default {
    render: () => null,
    computed: {
      ...mapState('app/settings/system', {_notifications: s => s.notifications.system}),
    },

    methods: {

      /**
       * Watch episode
       *
       * @param release
       * @param episode
       */
      toVideo({release, episode}) {
        this.$router.push({
          name: 'video',
          params: {
            key: `${release.id}:${episode.id}`,
            release: release,
            episode: episode,
            releaseName: release.names.original
          }
        });
      },
    },


    created() {
      ipc.on('app:notification', (e, release) => {

        // Check if release is set
        // Check if system notifications is enabled
        if (release && this._notifications === true) {

          // Show notification
          const episode = release.episodes[0];
          const title = episode ? episode.title : null;
          const poster = release.poster.image;
          const name = release.names.ru;

          if (title && name) {

            // Set notification name
            remote.app.setAppUserModelId(meta.name);

            // Create notification
            const notification = new window.Notification(title, {
              body: name,
              icon: poster
            });

            // If the user clicks in the Notifications Center, show the app
            notification.onclick = () => this.toVideo({release, episode});

          }
        }
      })
    }

  }
</script>
