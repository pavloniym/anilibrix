<template>
  <release-layout :loading="_loading">

      <!-- Loader -->
      <template v-if="_loading">
        <v-skeleton-loader
          v-for="(loader, k) in loaders"
          class="px-4 mt-4"
          :key="k"
          :type="loader">
        </v-skeleton-loader>
      </template>

      <!-- Release -->
      <template v-else>
        <release-card :release="_release"/>
        <release-playlist :episodes="_episodes" :release="_release" class="mt-6" @episode="toVideo"/>
      </template>

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
    name: "Release",
    components: {
      ReleaseCard,
      ReleaseLayout,
      ReleasePlaylist,
    },

    data() {
      return {
        loaders: [
          'heading',
          'sentences',
          'button',
          'text@12',
          'heading',
          'list-item-two-line@10'
        ],
      }
    },

    computed: {
      ...mapState('release', {
        _loading: s => s.loading,
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
        handler(releaseId) {

          // Update if release data changed
          if (this._release === null || this._release.id !== parseInt(releaseId)) {
            this._getRelease(releaseId);
          }
        }
      }
    }
  }
</script>
