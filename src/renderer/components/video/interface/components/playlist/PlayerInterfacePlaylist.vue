<template>
    <v-navigation-drawer
      v-model="visible"
      absolute
      temporary
      width="350"
      :style="{zIndex: 100}">

      <v-card>
        <v-card-title>Плейлист</v-card-title>
        <v-card-subtitle>Список всех серий релиза</v-card-subtitle>
        <release-playlist
          v-bind="{release, episodes}"
          class="pa-4"
          :playing="episode"
          @episode="toEpisode">
        </release-playlist>
      </v-card>

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
      toEpisode(episode) {
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
