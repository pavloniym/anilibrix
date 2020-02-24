<script>

  import {mapState, mapActions} from 'vuex'
  import __get from 'lodash/get'

  export default {
    render: () => null,
    computed: {
      ...mapState('notifications', ['items']),
      ...mapState('releases', ['posters']),


      /**
       * Get notifications from store
       * Get only not notified releases
       *
       * @return array
       */
      releases() {
        return Object
          .values(this.items || {})
          .filter(release => release.notification.isNotified === false)
      }
    },

    methods: {
      ...mapActions('notifications', ['setReleaseAsNotified']),
    },

    watch: {

      releases: {
        deep: true,
        immediate: true,
        handler(releases) {
          if (releases && releases.length > 0) {

            const release = releases[0];

            // Show notification
            const notification = new Notification(release.names.ru, {
              body: release.episode,
              icon: __get(this.posters, release.id, null)
            });

            // Set as notified to prevent further notifications on content update
           // this.setReleaseAsNotified(release.id);

          }
        }
      }

    }
  }
</script>
