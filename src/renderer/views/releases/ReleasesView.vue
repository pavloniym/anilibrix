<template>
  <releases-layout>
    <v-layout column justify-center fill-height class="mx-4">

      <releases-slider v-model="index" :items="_releases" :posters="_posters"/>
      <releases-data v-if="release" v-bind="{release}" class="mt-4"/>

    </v-layout>
  </releases-layout>
</template>

<script>

  import ReleasesLayout from '@layouts/releases'
  import {ReleasesData, ReleasesSlider} from '@components/releases'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'ReleasesView',
    components: {
      ReleasesLayout,
      ReleasesData, ReleasesSlider
    },
    computed: {
      ...mapState('releases', {
        _index: s => s.items.index,
        _releases: s => s.items.data || [],
        _posters: s => s.items.posters || {},
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
          this.setIndex(this._releases[index].id);
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

