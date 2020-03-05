<template>
  <v-overlay v-if="_loading" :value="true">
    <v-progress-circular indeterminate size="64"/>
  </v-overlay>
  <release-layout v-else>
    <div class="pa-6 fill-height">
      <v-layout>
        <div :style="{width: '5%'}"></div>
        <div class="d-flex" :style="{width: '90%'}">
          <v-card
            height="450"
            width="315"
            class="black"
            :style="{position: 'sticky', top: 0}">

            <v-img
              v-if="_poster"
              width="315"
              class="black"
              height="450"
              max-width="315"
              max-height="450"
              :src="_poster">
            </v-img>

          </v-card>

          <v-card
            flat
            class="ml-4"
            color="transparent"
            :style="{width: '100%'}">

            <v-card-title v-text="_release.names.ru" class="pt-0"/>
            <v-card-subtitle v-text="_release.names.original" class="pb-0"/>
            <v-card-subtitle v-text="_release.genres.join(' | ')" class="pt-0"/>
            <v-card-text>
              <v-chip label>{{_release.year}}</v-chip>
              <v-chip label>{{_release.type}}</v-chip>
              <div class="pt-4">{{_release.description}}</div>
            </v-card-text>
          </v-card>
        </div>
        <div :style="{width: '5%'}"></div>
      </v-layout>

     <release-episodes class="py-6" :release="_release" @click="watchEpisode" />

    </div>
  </release-layout>
</template>

<script>

  import ReleaseLayout from '@layouts/release'
  import {ReleaseEpisodes} from '@components/release'
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
      ReleaseEpisodes
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
