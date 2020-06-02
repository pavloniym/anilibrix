<template>
  <release-layout>

    <!-- Card -->
    <release-card
      v-bind="{loading}"
      :release="_release">
    </release-card>

    <!-- Playlist -->
    <release-playlist
      v-bind="{loading}"
      class="mt-6"
      :episodes="_episodes"
      :release="_release"
      @episode="toVideo">
    </release-playlist>

  </release-layout>
</template>

<script>

  import ReleaseLayout from '@layouts/release'
  import {ReleaseCard, ReleasePlaylist} from '@components/release'

  import __get from 'lodash/get'
  import {mapState} from 'vuex'

  const props = {
    releaseId: {
      type: [String, Number],
      default: null
    },
    releaseName: {
      type: String,
      default: null
    }
  };

  export default {
    props,
    name: "Release.View",
    meta() {
      return {
        title: `Релиз [${this.releaseId}]: ${this.releaseName}`
      }
    },
    components: {
      ReleaseCard,
      ReleaseLayout,
      ReleasePlaylist,
    },

    data() {
      return {
        loading: false,
      }
    },

    computed: {
      ...mapState('release', {
        _release: s => s.data,
        _episodes: s => __get(s, 'data.episodes') || [],
      })
    },

    methods: {

      /**
       * Watch episode
       *
       * @param episode
       */
      toVideo(episode) {
        this.$router.push({
          name: 'video',
          params: {
            key: `${this._release.id}:${episode.id}`,
            release: this._release,
            episode: episode,
            releaseName: this._release.names.original
          }
        });
      },

    },

    watch: {

      releaseId: {
        immediate: true,
        async handler(releaseId) {

          // Update if release data changed
          if (this._release === null || this._release.id !== parseInt(releaseId)) {

            // Get release data
            this.loading = true;
            await this.$store.dispatchPromise('release/getRelease', releaseId);
            this.loading = false;

          }
        }
      }
    }
  }
</script>
