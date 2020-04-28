<template>
  <v-navigation-drawer
    fixed
    width="350"
    :value="playlist"
    :style="{zIndex: 100}"
    @input="$emit('update:playlist', $event)">


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
    },
    playlist: {
      type: Boolean,
      default: false
    }
  };

  export default {
    props,
    components: {
      ReleasePlaylist
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
       * Watch episode
       *
       * @param episode
       */
      watchEpisode(episode) {
        this.$router.push({
          name: 'player',
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
