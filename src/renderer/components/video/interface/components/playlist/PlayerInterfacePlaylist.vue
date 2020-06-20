<template>
  <v-navigation-drawer
    v-model="visible"
    absolute
    temporary
    width="400"
    :style="{zIndex: 100}">

    <!-- System Bar Offset-->
    <app-system-bar-placeholder fixed/>

    <!-- Playlist -->
    <v-card :class="{'mt-9': !this.isMacOnFullscreen}">
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
  import AppSystemBarPlaceholder from '@components/app/systembar/placeholder'

  import __get from 'lodash/get'
  import {AppPlatformMixin} from '@mixins/app'

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
    mixins: [AppPlatformMixin],
    components: {
      ReleasePlaylist,
      AppSystemBarPlaceholder
    },

    data() {
      return {
        visible: false,
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
        this.visible = true;
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
            episode: episode,
            releaseName: this.release.names.original
          }
        });
      },


    }

  }
</script>
