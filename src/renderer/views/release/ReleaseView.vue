<template>
  <v-overlay v-if="loading" :value="true">
    <v-progress-circular indeterminate size="64"/>
  </v-overlay>
  <release-layout v-else-if="loading === false && release" v-bind="{poster}">

    <release-card/>
    <release-playlist class="my-6"/>

  </release-layout>
</template>

<script>

  import ReleaseLayout from '@layouts/release'
  import {ReleaseCard, ReleasePlaylist} from '@components/release'
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
      ReleaseLayout,
      ReleaseCard,
      ReleasePlaylist,
    },

    computed: {
      ...mapState('release', {
        loading: s => s.loading,
        poster: s => s.poster,
        release: s => s.data,
      })
    },

    methods: {
      ...mapActions('release', ['getRelease']),
    },

    watch: {
      releaseId: {
        immediate: true,
        handler(releaseId) {

          // Update if release data changed
          if(this.release === null || this.release.id !== parseInt(releaseId)) {
            this.getRelease(releaseId);
          }
        }
      }
    }
  }
</script>
