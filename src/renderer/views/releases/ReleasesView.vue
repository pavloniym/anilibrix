<template>
  <releases-layout>
    <v-layout column justify-center fill-height class="mx-4">
      <releases-slider v-model="selection" v-bind="{items, posters}"/>
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
      ReleasesLayout,
      ReleasesData, ReleasesSlider
    },
    computed: {
      ...mapState('releases', {
        index: s => s.index,
        items: s => s.data || [],
        posters: s => s.posters || {},
      }),


      selection: {

        /**
         * Get release index using it's hash
         * If no releases with last saved hash -> get first
         *
         * @return number
         */
        get() {
          const releaseIndex = this.items.findIndex(release => this.index === release.id);
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
          this.setIndex(this.items[index].id);
        }
      },


      /**
       * Get active release
       *
       * @return {*|null}
       */
      release() {
        return this.items[this.selection] || null;
      }
    },


    methods: {
      ...mapActions('releases', ['setIndex'])
    }

  }
</script>

