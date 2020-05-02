<template>
    <v-navigation-drawer
      v-bind="{value}"
      absolute
      temporary
      width="350"
      :style="{zIndex: 100}"
      @input="$emit('input', $event)">

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
    value: {
      type: Boolean,
      default: false
    },
    release: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null
    },
    container: {
      type: HTMLDivElement,
      default: null
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
