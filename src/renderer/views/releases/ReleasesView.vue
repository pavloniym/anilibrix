<template>
  <releases-layout>
    <v-layout column justify-center fill-height class="mx-4">

      <releases-slider v-model="index" v-bind="{loading}" :releases="_releases" @watch="toEpisode"/>
      <releases-data v-bind="{release, loading}" class="mt-4" @watch="toEpisode"/>

    </v-layout>
  </releases-layout>
</template>

<script>

  import ReleasesLayout from '@layouts/releases'
  import {ReleasesData, ReleasesSlider} from '@components/releases'

  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'Releases.View',
    meta: {
      title: 'Последние релизы'
    },
    components: {
      ReleasesData,
      ReleasesLayout,
      ReleasesSlider,
    },

    data() {
      return {
        loading: true,
      }
    },

    computed: {
      ...mapState('releases', {
        _index: s => s.index,
        _loading: s => s.loading,
        _releases: s => s.data || [],
      }),


      index: {

        /**
         * Get release index using it's hash
         * If no releases with last saved hash -> get first
         *
         * @return number
         */
        get() {
          const releaseIndex = this._releases.findIndex(release => this._index === release.id);
          return releaseIndex > -1
            ? releaseIndex
            : 0;
        },

        /**
         * Get hash from release with provided index
         * Save hash to store
         *
         * @param index
         * @return void
         */
        set(index) {
          this._setIndex(this._releases[index] ? this._releases[index].id : null);
        }
      },


      /**
       * Get active release
       *
       * @return {*|null}
       */
      release() {
        return this._releases[this.index] || null;
      }
    },


    methods: {
      ...mapActions('releases', {_setIndex: 'setIndex'}),


      /**
       * Watch episode
       *
       * @param release
       * @param episode
       */
      toEpisode({release, episode}) {
        if (release && episode) {
          this.$router.push({
            name: 'video',
            params: {
              key: `${release.id}:${episode.id}`,
              release,
              episode,
              releaseName: release.names.original
            }
          });
        }
      },

    },

    watch: {

      _loading: {
        immediate: true,
        handler(_loading) {
          if (_loading === false && this.loading === true) {
            this.loading = false;
          }
        }
      }

    }

  }
</script>

