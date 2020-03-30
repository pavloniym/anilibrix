<script>

  import {mapState, mapActions} from 'vuex'
  import __get from 'lodash/get'

  export default {
    render: () => null,
    computed: {
      ...mapState('notifications', ['items']),
      ...mapState('releases', ['posters']),

    },

    methods: {
      ...mapActions('notifications', ['removeRelease']),
    },

    watch: {

      items: {
        deep: true,
        immediate: true,
        handler(releases) {
          if (releases && releases.length > 0) {

            // Get release data
            const release = releases[0];

            // Show notification
            new Notification(release.names.ru, {
              body: release.episode.title,
              icon: __get(this.posters, release.id, null)
            });


            // Set as notified to prevent further notifications on content update
            setTimeout(() => this.removeRelease(0), 5000)
          }
        }
      }

    }
  }
</script>
