<template>
  <v-overlay v-if="_loading" :value="true">
    <v-progress-circular indeterminate size="64"/>
  </v-overlay>
  <release-layout v-else>
    <div class="pa-6 fill-height" v-if="_release">

      <release-card :release="_release" :poster="_poster"/>
      <release-episodes class="py-6" :release="_release" @click="watchEpisode"/>

    </div>
  </release-layout>
</template>

<script>

  import ReleaseLayout from '@layouts/release'
  import {ReleaseEpisodes, ReleaseCard} from '@components/release'
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
      ReleaseEpisodes,
      ReleaseCard,
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
        _poster: s => s.item.poster
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
