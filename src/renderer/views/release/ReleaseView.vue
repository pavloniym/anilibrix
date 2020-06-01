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
  import {mapState, mapActions} from 'vuex'

  const props = {
    releaseId: {
      type: [String, Number],
      default: null
    }
  };

  export default {
    props,
    name: "Release.View",
    components: {
      ReleaseCard,
      ReleaseLayout,
      ReleasePlaylist,
    },

    data() {
      return {
        loading: false,
        /* loaders: [
           'heading',
           'sentences',
           'button',
           'text@12',
           'heading',
           'list-item-two-line@10'
         ],*/
      }
    },

    computed: {
      ...mapState('release', {
        _release: s => s.data,
        _episodes: s => __get(s, 'data.episodes') || [],
      })
    },

    methods: {
      ...mapActions('release', {_getRelease: 'getRelease'}),


      /**
       * Go back to releases page
       *
       * @return void
       */
      toReleases() {
        this.$router.push({
          name: 'heading'
        });
      },


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
            episode: episode
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
            this.loading = true;
            await this.$store.dispatchPromise('release/getRelease', releaseId);
            this.loading = false;
          }
        }
      }
    }
  }
</script>
