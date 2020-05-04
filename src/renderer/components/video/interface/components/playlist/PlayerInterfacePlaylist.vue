<template>
    <v-navigation-drawer
      v-model="visible"
      absolute
      temporary
      width="350"
      :style="{zIndex: 100}">

      <release-playlist
        v-bind="{episodes}"
        class="pa-4"
        @watch="watchEpisode">
      </release-playlist>

    </v-navigation-drawer>
</template>

<script>

  import ReleasePlaylist from '@components/release/playlist'
  import __get from 'lodash/get'

  const props = {
    release: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    components: {
      ReleasePlaylist
    },

    data() {
      return {
        visible: false
      }
    },

    computed: {

      /**
       * Get episodes
       *
       * @return {*|*[]}
       */
      episodes() {
        return __get(this.release, 'episodes') || [];
      }

    },

    methods: {

      /**
       * Show playlist
       *
       * @return void
       */
      show() {
        this.visible = true
      },

      /**
       * Watch episode
       *
       * @param episode
       */
      watchEpisode(episode) {
        this.$router.push({
          name: 'video',
          params: {
            key: `${this.release.id}:${episode.id}`,
            release: this.release,
            episode: episode
          }
        });
      },


    }

  }
</script>
