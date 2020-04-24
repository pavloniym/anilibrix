<template>
  <releases-layout>
    <v-layout column justify-center fill-height class="mx-4">
      <releases-slider v-model="index" :releases="_releases" :posters="_posters"/>
      <releases-data v-if="release" v-bind="{release}" class="mt-4"/>
    </v-layout>
  </releases-layout>
</template>

<script>

  import ReleasesLayout from '@layouts/releases'
  import {ReleasesData, ReleasesSlider} from '@components/releases'

  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'Releases',
    components: {
      ReleasesData,
      ReleasesLayout,
      ReleasesSlider,
    },
    computed: {
      ...mapState('releases', {
        _index: s => s.index,
        _posters: s => s.posters || {},
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
          this._setIndex(this._releases[index].id);
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
      ...mapActions('releases', {_setIndex: 'setIndex'})
    }

  }
</script>

