<template>
  <v-overlay v-if="_loading" :value="true">
    <v-progress-circular indeterminate size="64"/>
  </v-overlay>
  <release-layout v-else-if="_loading === false && _release" :poster="_poster">

    <release-card/>
    <release-playlist class="my-6" @click="watchEpisode"/>

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
    name: "ReleaseView",
    components: {
      ReleaseLayout,
      ReleaseCard,
      ReleasePlaylist,
    },
    data() {
      return {
        episode: null
      }
    },

    computed: {
      ...mapState('settings/player', ['type']),
      ...mapState('releases', {
        _loading: s => s.item.loading,
        _release: s => s.item.data,
        _poster: s => s.item.poster,
        _jikan: s => s.item.jikan,
      })
    },

    methods: {
      ...mapActions('releases', ['getRelease']),


      /**
       * Watch release
       * Set player data:
       * -> release title and episode
       * -> stream data
       *
       * @param episode
       */
      watchEpisode(episode) {

        const payload = {
          episode: episode,
          release: this._release,
          type: this.type
        };

        this.$store
          .dispatchPromise('player/setPlayerData', payload)
          .then(() => this.$router.push({name: 'player'}))
          .finally(() => this.loading = false);
      },
    },


    created() {
      this.getRelease(this.releaseId)
    }
  }
</script>
