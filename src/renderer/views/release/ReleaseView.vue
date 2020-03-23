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
        release: s => s.data,
        loading: s => s.loading,
        poster: s => s.poster,
      })
    },

    methods: {
      ...mapActions('release', ['getRelease']),


      /**
       * Watch release
       * Set player data:
       * -> release title and episode
       * -> stream data
       *
       * @param episode
       */
      /*watchEpisode(episode) {

        const payload = {
          episode: episode,
          release: this._release,
          type: this.type
        };

        this.$store
          .dispatchPromise('player/setPlayerData', payload)
          .then(() => this.$router.push({name: 'player'}))
          .finally(() => this.loading = false);
      },*/
    },


    watch: {
      releaseId: {
        immediate: true,
        handler(releaseId) {
          this.getRelease(releaseId);
        }
      }
    }
  }
</script>
