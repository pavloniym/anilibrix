<template>
  <main-layout>
    <v-layout column justify-center fill-height class="mx-4">

      <release-slider v-model="index" :items="_releases" :posters="_posters"/>
      <release-data v-if="release" v-bind="{release}" class="mt-4" />

    </v-layout>
  </main-layout>
</template>

<script>

  import MainLayout from '@layouts/main'
  import {ReleaseData, ReleaseSlider} from '@components/release'

  import {mapState} from 'vuex'

  export default {
    name: 'HomeView',
    components: {
      MainLayout,
      ReleaseSlider, ReleaseData
    },
    data() {
      return {
        index: 0
      }
    },
    computed: {

      ...mapState('releases', {
        _releases: s => s.items || [],
        _posters: s => s.posters || {},
      }),


      /**
       * Get active release
       *
       * @return {*|null}
       */
      release() {
        return this._releases[this.index] || null;
      }
    },

  }
</script>

