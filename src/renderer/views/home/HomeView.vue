<template>
  <main-layout>
    <v-layout column justify-center fill-height class="mx-4">

      <release-slider v-model="index" :items="_releases" :posters="_posters"/>
      <release-data v-if="release" v-bind="{release}" class="mt-4"/>

    </v-layout>
  </main-layout>
</template>

<script>

  import MainLayout from '@layouts/main'
  import {ReleaseData, ReleaseSlider} from '@components/release'
  import {mapState, mapActions} from 'vuex'
  import __get from 'lodash/get'

  export default {
    name: 'HomeView',
    components: {
      MainLayout,
      ReleaseSlider, ReleaseData
    },
    computed: {
      ...mapState('releases', {
        _index: s => s.index,
        _releases: s => s.items || [],
        _posters: s => s.posters || {},
      }),


      index: {

        /**
         * Get release index using it's hash
         * If no releases with last saved hash -> get first
         *
         * @return number
         */
        get() {
          const releaseIndex = this._releases.findIndex(release => this._index === release.hash);
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
          const releaseHash = __get(this._releases, [index, 'hash'], null);
          this.setIndex(releaseHash);
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
      ...mapActions('releases', ['setIndex'])
    }

  }
</script>

