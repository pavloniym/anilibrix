<template>
  <v-layout v-if="loading || _release" column>

    <card v-bind="{loading}" class="mb-6" :release="_release"/>
    <playlist
      v-bind="{loading}"
      :episodes="_episodes"
      :release="_release"
      @episode="toVideo">
    </playlist>

  </v-layout>
</template>

<script>

  import Card from '@components/release/card'
  import Playlist from '@components/release/playlist'

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
      return {title: `Релиз [${this.releaseId}]: ${this.releaseName}`}
    },
    components: {
      Card,
      Playlist
    },

    data() {
      return {
        loading: false,
      }
    },

    computed: {
      ...mapState('release', {
        _release: s => s.data,
        _episodes: s => s.data && s.data.episodes ? s.data.episodes : [],
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
