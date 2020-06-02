<script>

  import {mapState} from 'vuex'

  export default {
    render: () => null,
    computed: {
      ...mapState('notifications', {_item: 'item'}),
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

    watch: {

      _item: {
        deep: true,
        immediate: true,
        handler(release) {
          if (release) {

            // Show notification
            const episode = release.episodes[0];
            const title = episode ? episode.title : null;
            const poster = release.poster.image;

            if (title) {

              // Create notification
              const notification = new window.Notification(release.names.ru, {body: title, icon: poster});

              // If the user clicks in the Notifications Center, show the app
              notification.onclick = () => this.toVideo({release, episode});

            }
          }
        }
      }

    }
  }
</script>
